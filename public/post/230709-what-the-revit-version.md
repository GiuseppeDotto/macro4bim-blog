<!-- {
"createdAt": "Jul 9, 2023",
"title": "What the Revit Version?",
"tags": ["Dynamo", "Revit API", "Python"],
"votes": 2,
"views": 286,
"published": true
} -->

# What the Revit Version?

Hi everyone!

Today I was chatting with Sahil Nama and after a quick description of a **BIM issue**, we felt that was time for a new M4B post!! 🆘

The issue concerned a bunch of Revit files saved in **different versions** of the program which, as you know, is not retro-compatible friendly... ... ... 😔

We needed a way to have a **clear and fast overview** of the Revit versions' situation!!

---

I'm super excited to share with you a tool for analyzing Revit projects and families and returning on which version of the program they have been created. It's handy as you finally will **not need to open Revit** to access this info - You can just run the tool and get a report in seconds! 🐇

## How to

This paragraph will be very short as everything you need to do is actually copy-paste the path of the directory containing the Revit file to analyze.

Here is a short demonstrative video:

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XP-ZXujWsCw?si=F3Tqsq1XDtDvchBA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</center>

---

**Interestingly**, the script is inspired by an Autodesk workaround to check the Revit version without Revit. Basically, it involves opening the Revit file in a text editor and looking for a specific line that contains the version number.

**_ref:_** [How to check from which version a Revit file comes from before opening it (autodesk.com)](https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-check-from-which-version-Revit-file-comes-from-before-open-it.html)

> :::image-small
>
> ![](https://media4.giphy.com/media/l2JI84kB30Gypc9ig/giphy.gif)

Nice but... slow. Especially if the file is big and/or if the files are many! Our tool automates this process and does it for multiple files at once.

---

I think this can be very useful for anyone who works with Revit files from different sources and needs to know which version they are compatible with.

If you want to try out the tool, you can download it from my [GitHub](https://github.com/GiuseppeDotto/Macro4BIM/blob/main/get_RevitVersion/dist/get_RevitVersion.exe) page.

---

I hope you find it helpful, and let me know what you think in the comments!
