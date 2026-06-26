# Trade-offs: what I'd evolve next

This repository is a faithful **snapshot** of a working product, not a re-architecture. The decisions below were the right call for a small, fast-moving SaaS shipped by one engineer; this document is the candid "if I were taking it to the next stage" list. It is framed as **snapshot vs. evolution**, not as an apology. Each item works in production today, and each has a clear next step.

## 1. Replace the 1-second busy-loops

**Today:** the **Conductor** and **TaskManager** each run a `setInterval`-style **1-second loop:** the Conductor polls Mongo for fresh conversations to evaluate, and the TaskManager polls the `tasks` collection for work to deliver.

**Why it's fine for now:** it's trivial to reason about, has no extra infrastructure, and at the product's volume the latency (≤1s) and the constant Mongo reads are negligible.

**Evolution:** move to an event-driven model: either a real broker (RabbitMQ / NATS / Redis Streams) for the `tasks` queue, or **Mongo change streams** to react to inserts instead of polling. That removes the steady polling load, drops tail latency, and scales the consumer horizontally without two services hammering the database every second.

## 2. Add internal east-west authentication

**Today:** the Nginx **`auth_request` gateway** authenticates everything at the edge, but service-to-service HTTP calls inside the mesh are **unauthenticated**. They trust the Docker network.

**Why it's fine for now:** the services are not exposed outside the Docker network, so the only reachable surface is the gateway.

**Evolution:** add internal authn: signed service tokens / mTLS between services (or a service mesh like Linkerd), so a single compromised container can't freely call every peer. Defence in depth instead of a single perimeter.

## 3. A service registry instead of `*_HOST` envs

**Today:** each service finds its peers through hard-coded `*_HOST` environment variables resolved by an axios client factory.

**Why it's fine for now:** with a fixed set of containers on one Compose network, static env wiring is simple and predictable.

**Evolution:** introduce **service discovery** (Consul, Kubernetes DNS, or even Docker's built-in DNS with health checks) so instances can scale, move, and self-register without re-templating env files across services.

## 4. CI/CD instead of "build on prod"

**Today:** deployment is a **single-node** model where images are **built on the production host** via Ansible.

**Why it's fine for now:** one box, one operator, fast iteration. No pipeline to maintain.

**Evolution:** build images in **CI**, push to a registry, and have prod **pull** immutable, tested artifacts. That gives reproducible builds, a rollback target (previous image tag), and removes build tooling/load from the production host.

## 5. Least-privilege deploy user instead of root SSH

**Today:** Ansible connects over SSH as **root**.

**Why it's fine for now:** it's the path of least resistance for a solo-operated single node.

**Evolution:** deploy as a dedicated **least-privilege user** with scoped `sudo` for only the deploy steps, key-based auth, and no direct root login. Standard hardening that shrinks the blast radius of a leaked key.

---

None of these block the product from doing its job today. They are the natural next increments once volume, team size, or the security bar grows, captured here so the reasoning is explicit rather than implied.
