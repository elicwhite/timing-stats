timing-stats
=============
Slow builds? Want to make it faster? timing-stats shows you the different stages of your builds to know what can be sped up. Different charts give you different information into your builds.

- [Chart Types](#chart-types)
  * [Stacked Chart](#stacked-chart)
  * [Gantt Chart](#gantt-chart)
  * [Critical Path Chart](#critical-path-chart)
- [Data Format](#data-format)
  * [JSON Schema](#json-schema)
  * [Full Example](#full-example)
- [Hooking up you project](#hooking-up-you-project)
  * [Saving the timestamps throughout the build](#saving-the-timestamps-throughout-the-build)
  * [Process build timestamp data](#process-build-timestamp-data)
  * [Persist the timing data](#persist-the-timing-data)
  * [Measure your build](#measure-your-build)
  * [Integrated approaches](#integrated-approaches)

# Chart Types
## Stacked Chart
Builds are made up of many stages. Examples of stages include:

* installing dependencies from npm
* running a unit test
* publishing new versions of your package.

The stacked chart shows you the time of all of these stages on top of each other so you can see how they relate and what stages take up the most time.

![Stacked Chart](images/stacked_chart.png?raw=true)

## Gantt Chart
The gantt chart shows the stages during a single build. This is probably the most valuable chart to understand what you can improve to speed up your build.

![Gantt Chart](images/gantt_chart.png?raw=true)

## Critical Path Chart
When you have stages that run in parallel, it may not actually matter if certain stages are slow. In the above example, speeding up the linters won't improve the overall build time.

In order to visualize this information, this chart only show the stages that are on the critical path for the given build. In a completely sequential build this will be the same as the regular stacked chart. For builds that utilize parallelization, this will be much more valuable.

![Critical Path Chart](images/critical_stacked_chart.png?raw=true)

# Data Format
In order to read and support many projects and data sources, we require a specific data format. The input is a JSON array of objects. Each object represents a "build".

A build has two parts, the build identifier and an array of stages. The identifier would likely come from your continuous integration environment. Each stage has a string name and a start and end timestamp. These timestamps should include milliseconds as they are used to figure out the ordering between parallel tasks.

## JSON Schema
The [JSON schema](http://json-schema.org/) description of the data format is as follows.

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer"
      },
      "stages": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "stage": {
              "type": "string"
            },
            "start": {
              "type": "integer"
            },
            "end": {
              "type": "integer"
            }
          },
          "required": [
            "stage",
            "start",
            "end"
          ]
        }
      }
    },
    "required": [
      "id",
      "stages"
    ]
  }
}
```

## Full Example
This web application monitors its own build and deployment process, reporting back the timing data as the sample data for the application. You can see the JSON file for the sample data [here](sample_data.json).

# Hooking up you project
In order to get these visualizations for your project, you need to gather the start and end times for the stages in your build. The way you do this does not matter as long as the output data is in the correct format.

After implementing this for a few different projects in a few different languages we can provide a recommendations for getting started quickly. This project measures its own build stages, so you can look at the `scripts` in `package.json` file to read the code.

There are a few steps to gathering the data we need.
 * Save the start and end timestamps throughout the process of a build
 * At the end of the build do some processing on this data
 * Persist the data somewhere
 * Measure your build

## Saving the timestamps throughout the build
I've found the easiest way to do this is to create a simple script that will append a line to a text file. A line in this file might look something like this:

```
START::my stage::1481968299009
```

You can see an example of a script like this [here](script/timing.js).

## Process build timestamp data
At the end of the build, once all of the stages have been written to the text file we want to convert the data into the final JSON form. This script should parse the lines and group the start and stop times for a given stage. You can see an example of a script like this [here](script/append_build_times.js).

## Persist the timing data
Once we have the timing information in the right json format, we need to save it somewhere. You may choose to upload it to something like S3 or just commit it back to the repo.

This project commits it back to the repo on successful master builds.

## Measure your build
Now that you have a script to process the time your stages take, we need to measure the stages. Imagine you started with a `scripts` command in your `package.json` that looks like this:

```
{
  "scripts": {
    "style": "eslint"
  }
}
```

We will change this to call our timing script before and after eslint:

```
{
  "scripts": {
    "style": "my-timing-script START eslint && eslint && my-timing-script STOP eslint "
  }
}
```

## Integrated approaches
Measuring individual stages in your `package.json` is fine for getting started. Tools can help you do this in an automated way.

 * [grunt-before-after-hooks](https://github.com/TheSavior/grunt-before-after-hooks) provides a way to call a script before and after each task.
