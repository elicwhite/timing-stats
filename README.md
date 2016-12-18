timing-stats
=============
Slow builds? Want to make it faster? timing-stats shows you the different stages of your builds to know what can be sped up. Different charts give you different information into your builds.

# Chart Types
## Stacked Chart
Builds are made up of many stages. Examples of stages include:

* installing dependencies from npm
* running a unit test
* publishing new versions of your package.

The stacked chart shows you the time of all of these stages on top of each other so you can see how they relate and what stages take up the most time.

## Critical Path Chart
When you have stages that run in parallel, it may not actually matter if certain stages are slow. They may not have any impact on your overall build time. For example, you may run your linters in parallel with your unit tests. If your unit tests take 30 seconds and the linters take 20 seconds, speeding up the linters won't actually affect your build time. You should focus on improving the unit test time instead.

In order to provide this information, we only show the stages that are on the critical path for the given build. In a completely sequential build, this will be the same as the regular stacked chart. For builds that utilize parallelization, this will be much more valuable.

## Gantt Chart
The stacked charts do a great job of showing you the slow parts of your builds over time. As you make improvements you can see the impact of those changes and see what might have become the new critical path. However, the stacked charts don't give good visability into what actually happens in a build.

The gantt chart will show you what things occurred and when, in a build. This is useful for understanding the parallelization and dependencies of stages.
