---
title: Code Sharing
---

A mantra to live by: Code sharing should allow your code to be "free" and "unchained"

**The NativeScript TSC's 5 fundamental lessons about good code sharing**

1. If you can share your code easily with other paradigms, other disciplines, other runtimes even, then you have a good code sharing approach that will continue to provide you and your team joy. No developer or team willingly gets into code sharing hoping to find themselves in a corner later. You always want to share now to more easily maintain and scale the code later.

2. A good code sharing approach should fit naturally in with well supported community standards and not require any extra build tooling just for the sharability to support itself. It should, in other words, stand firmly on it's own in scope of the language it is written in.

3. A good code sharing approach should not have to introduce new file extensions purely for sake of sharability (outside of those naturally supported by the framework) to deal with and otherwise alter the way you think about your code in general. All team's organize code by folders naturally and the same should be matched with good code sharing approaches avoiding new file extensions and concepts that go beyond general code organization.

4. A good code sharing approach should clearly identify deployment/distribution lines as well as distinct platform separation allowing various shared code segments to have clear designated deployment targets allowing teams to control their own sophisticated build pipelines as they desire. Further the shared code should live within a thoughtful organizational structure that supports the ability to scale and adapt to future needs aside from the deployment targets that use the shared code.

5. Within the specific scope of NativeScript's viewpoint, JavaScript is the universal langugage which provides the opportunity to share code effectively and responsibly. An approach that is based fundamentally on the strengths of JavaScript (and inherently TypeScript) is a good code sharing approach.

Notes:

Framework's are often "domain specific in nature". Programming languages are often the opposite or at least more broadly applicable to a wider set of domain problems. A good code sharing approach centers itself around the programming language and not the framework.

If a "code sharing solution" is maintained by a framework that can often mean there are inherent biases that interlock it's "sharable nature" with the framework, even if not intentional, it is somewhat inevitable. This breaks the first rule of a good code sharing approach.

## Recommendations and Solutions

- [Nx with xplat](https://nstudio.io/xplat)

  **Pros:**

  - It's centered around JavaScript/TypeScript (lesson 1 and 5 above)
  - Uses standard build tooling like typescript or webpack to build code (lesson 2 above)
  - No custom file extensions to deal with (lesson 3 above)
  - Nx splits up "apps" and "libs" clearly identifying deployment/distribution targets "apps" that consume shared code "libs" (lesson 4 above)
  - Opinionated architecture is provided via xplat which helps to avoid common pitfalls from hard lessons learned in real world developments with cross platform mixtures

  **Cons:**

  - Some learning curve if not used to Nx practices in general
  - Some learning curve if you have not developed applications in large codebases before
  - Understanding the [basic fundamentals](https://nstudio.io/xplat/fundamentals/architecture) of the provided architecture

- [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

  **Pros:**

  - It's centered around JavaScript/TypeScript (lesson 1 and 5 above)
  - Uses standard build tooling like typescript or webpack to build code (lesson 2 above)
  - No custom file extensions to deal with (lesson 3 above)
  - Can link/share dependencies

  **Cons:**

  - You are on your own with organizational structure which can lead to common pitfalls with cross platform mixtures
  - No out of the box deployment/distribution target setup to identify app targets vs. shared code

- [Lerna](https://github.com/lerna/lerna)

  **Pros:**

  - It's centered around JavaScript/TypeScript (lesson 1 and 5 above)
  - Uses standard build tooling like typescript or webpack to build code (lesson 2 above)
  - No custom file extensions to deal with (lesson 3 above)

  **Cons:**

  - You are on your own with organizational structure which can lead to common pitfalls with cross platform mixtures
  - No out of the box deployment/distribution target setup to identify app targets vs. shared code
  - It's generally geared towards open source library management so no extra helpful tooling for "workspace management" in general
