<!-- {
"createdAt": "Oct 23, 2023",
"title": "Automatic Room Tag Leaders",
"tags": ["pyRevit", "pyM4B", "Python"],
"votes": 0,
"views": 231,
"published": true
} -->

# Automatic Room Tag leaders

Hi there, fellow Revit users!

Also you, like many other friends and colleagues of mine, are surprised by the "new" Revit 2023 feature of automatically adding a **Room Tag leader** every time that you move a room? And also you are looking for a way to revert back to this new setting?

Luckily is an easy fix, here is the official link from Autodesk:[Automatic leaders are added to tags when moving rooms in Revit (autodesk.com)](https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/Automatic-leaders-are-added-to-tags-when-moving-rooms-in-Revit.html)

---

As more than one person reached out with the same question, today I'm going to share with you a new script that I wrote to automatically activate the setting "DisableRoomAreaSpaceAutomaticLeader" in your **Revit.ini** files, in other words, to add the below line of text after the "[Misc]" setting.

    DisableRoomAreaSpaceAutomaticLeader=1

We know how it can be tedious to manually edit the Revit.ini files for each computer and that's why we support with this script that does it for you in a second!

> :::image-small
>
> ![](https://media1.giphy.com/media/zUMsHiwfWLYVrbaSef/giphy.mp4?cid=e2a3cbdepu8lyy6dkgqrvwyydiliapmrq48we72vr7j8h2k3&ep=v1_gifs_search&rid=giphy.gif)

The script is written in Python and uses the pyRevit to be directly reachable from your Revit interface. It works by finding all the Revit.ini files in your system and modifying (or adding) the line that controls the "DisableRoomAreaSpaceAutomaticLeader" setting. It is compatible with Revit 2019 and later versions.

## How to

To use the script, you need to have pyRevit installed and loaded in your Revit session, as well as the pyM4B extension. Here you can find more about pyM4B, in case you haven't already installed it. After that, you can run the script from the pyM4B tab in Revit. You will see a message box that confirms the success or failure of the operation, listing the file path of all the INI files edited by the function.

Below you can find the updated look of our pyM4B tab 🚀

> :::image-large
>
> ![](./media/automatic-room-tag-legend.png)

---

**Curiosity** 🐍

Editing the Revit.ini file in Python can be more complex than expected. This is because it does not have a header and therefore the classic Python module **_configparser_** will fail to .read(file).

In order to workaround this, we had to treat the Revit.ini file as it was a "simple" text file, reading it as text in encoding "utf-16", the first line, which if opened in NotePad looks empty, contains in fact **_special_** characters.

```python

# DIRECT TO THE MAIN FOLDER WHERE ALL THE REVIT.INI CAN BE FIND
folder = os.getenv('APPDATA')
folder = os.path.join(folder, 'Autodesk', 'Revit')

for dirpath, dirnames, filenames in os.walk(folder):
    for f in filenames:
        if f == 'Revit.ini':
            file_path = os.path.join(dirpath, f)

            # WRITE AND READ IN UTF-16
            with open(file_path, 'r', encoding='utf-16') as f:
                content = f.read()
                new_text = add_settings(content)
            with open(file_path, 'w', encoding='utf-16') as f:
                f.write(new_text)
                print(f'EDIT: {file_path}')
```

---

I hope you find this script useful and it saves you some time and hassle. Let me know what you think in the comments below.

Happy Reviting, Cheers!
