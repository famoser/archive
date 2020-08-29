import sys
from PIL import Image
from pathlib import Path

images = {}
for path in sorted(Path('images').glob('*.png')):
    full_path = str(path.absolute())
    print("opening " + full_path)
    images[path.name] = Image.open(full_path)

height = 5888
width = 8448
new_im = Image.new('RGB', (width + 256, height + 256))

for imageName in images:
    # imageName of the form t-1280l512.png
    path = imageName.split("l")
    top = int(path[0][1:]) + height
    left = int(path[1][0:-4]) + 256

    new_im.paste(images[imageName], (left,top))

new_im.save('output.png')