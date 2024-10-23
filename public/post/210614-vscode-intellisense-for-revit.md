<!-- {
"createdAt": "Jun 14, 2021",
"title": "VSCode intelliSense for Revit",
"tags": ["Revit API", "Python"],
"votes": 0,
"views": 5414,
"published": true
} -->

# VSCode intelliSense for Revit

As most of you have probably got, the better achievements I have as a developer within Revit API are thanks to Python 🐍, so, I thought was nice to share with you the **environment** I set-up for myself in **Visual Studio Code** ([Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)).

Many thanks to Gui Talarico that shared a fundamental repository for the arguments we are going to discuss today:

[GitHub - gtalarico/ironpython-stubs: Autocomplete stubs for common IronPython/.NET libraries](https://github.com/gtalarico/ironpython-stubs)

<span style="color: red">side note</span>: as suggested from [Gui Talarico](https://www.linkedin.com/in/gtalarico/) "stubs would technically need to be generated for each Revit API version and they haven't in a while, so stubs might be a little stale."

---

In the below video I show a step by step, from zero to hero, setting up.

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/88zIQCZw8BA?si=xPaRMp9g3uZ4ABG8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</center>

Here, in short, the list of what to do:

- Download the stumps from the above link
- If you didn't yet:
  - Install Visual Studio Code
  - Install Python extension for VSCode
- Edit the settings.json file of the Python extension
  - Be sure that your python version is IronPython.
  - Be sure to have the stubs path between the extra-paths.
- reload window in VSCode
- enjoy! ✨

I always like the videos, trustful and usually very explicative, however for the lazy-ones, you can't copy/nothing neither you can read with calm, unless you stop in the very right moment...

so I decided to share also how looks my current settings.json file:

```json
{
  "workbench.editorAssociations": {
    "*.ipynb": "jupyter.notebook.ipynb"
  },
  "python.pythonPath": "c:\\Program Files (x86)\\IronPython 2.7\\ipy64.exe",
  "python.languageServer": "Microsoft",
  "python.autoComplete.extraPaths": [
    "C:\\Users\\giuse\\AppData\\Roaming\\pyRevit-Master\\pyrevitlib",
    "C:\\Users\\giuse\\AppData\\Roaming\\ironpython-stubs-master\\release\\stubs.min"
  ],
  "workbench.colorTheme": "Monokai"
}
```

---

Quick and easy, but most of all I want to tell you that it's not a coincidence that in this post I mentioned #pyRevit , the plan is to start on this blog a **new series** on it, **too good** to not mention it, **too powerful** to not use or being amazed from!!!

> :::image-small
>
> ![](https://media0.giphy.com/media/MOWPkhRAUbR7i/giphy.gif)

Stay tuned, <br />
Cheers!
