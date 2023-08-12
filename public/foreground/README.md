# Basic Directory Explanation: What's This?
We're using `list.json` to retrieve a list of all the files in this directory. The JSON file contains an array of objects, which are used as options for the overlay selector menu on the `/edit` page. The `label` represents the text displayed in the menu, and the `value` corresponds to the path of the image that will be printed onto the background image.

Example `list.json` file:
```json
[
  { "label": "MySuperForegroundImage", "value": "/foreground/my-super-foreground-image.png" },
]
```

# How to add a new foreground image?
1. Put the image in this directory
2. Add the image to the `list.json` file
3. Commit and push your changes 🎉
