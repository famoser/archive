import requests
from math import floor
from os import path
import os

def download(url, file_name):
    with open(file_name, "wb") as file:
        response = requests.get(url)
        if response.status_code != 200:
            print("download failed with " + str(response.status_code) + " for " + url)
            return

        size = len(response.content)
        if size > 50:
            file.write(response.content)
            return
    
    print("no file saved for " + url)
    os.remove(file_name)

# JS source
# var metaLeft = Math.floor(l / (layer._map.kaMap.tileWidth * layer._map.kaMap.metaWidth)) * layer._map.kaMap.tileWidth * layer._map.kaMap.metaWidth;
# var metaTop = Math.floor(t / (layer._map.kaMap.tileHeight * layer._map.kaMap.metaHeight)) * layer._map.kaMap.tileHeight * layer._map.kaMap.metaHeight;
# var metaTileId = 't' + metaTop + '/l' + metaLeft;
# var groupsDir = (layer.name != '') ? layer.name.replace(/\W/g, '_') : 'def';
# var cacheDir = layer._map.kaMap.webCache + gogisCurrentInstance + '/' + layer._map.aScales[layer._map.currentScale] + '/' + groupsDir + '/def/' + metaTileId;
# var tileId = "t" + t + "l" + l;
# var imageExtension = layer.imageformat.toLowerCase();
# imageExtension = ((imageExtension.indexOf('png') == 0 || imageExtension.indexOf('alpha') == 0 || imageExtension.length > 3) ? 'png' : imageExtension);
# src = cacheDir + "/" + tileId + "." + imageExtension;
# produces src = "https://merian.bs.ch//tmp/kacache/merianplan/2000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-1536/l-1536/t-1280l-512.png"

# links produced
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-3072/l-1536/t-3072l-256.png top 0 left 0
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-3072/l0/t-3072l0.png top 0 left -1
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-3072/l0/t-3072l256.png top 0, left -2
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-3072/l-1536/t-2816l-256.png top -1 left 0
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-3072/l0/t-2816l0.png top -1, left -1
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-1536/l-1536/t-256l-256.png top -max, left 0
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-1536/l0/t-256l0.png top -max, left -1
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t0/l3072/t0l4352.png top -max, left -max
# ../tmp/kacache/merianplan/1000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-3072/l3072/t-3072l4096.png top 0, left -max

# ../tmp/kacache/merianplan/500/LAYEROBJ_MERIANPLAN_DETAIL/def/t-6144/l-1536/t-5888l-256.png
# ../tmp/kacache/merianplan/500/LAYEROBJ_MERIANPLAN_DETAIL/def/t-6144/l6144/t-5888l6912.png

# ../tmp/kacache/merianplan/500/LAYEROBJ_MERIANPLAN_DETAIL/def/t-4608/l4608/t-4352l4864.png
base_url = "https://merian.bs.ch/tmp/kacache/merianplan/500/LAYEROBJ_MERIANPLAN_DETAIL/def"
download_folder = "images"


def get_folder(entry):
    if entry < -4608:
        return -6144
    elif entry < -3072:
        return -4608
    elif entry < -1536:
        return -3072
    elif entry < -0:
        return -1536
    elif entry < 1536:
        return 0
    elif entry < 3072:
        return 1536
    elif entry < 4608:
        return 3072
    elif entry < 6144:
        return 4608
    elif entry < 7680:
        return 6144
    else:
        return 7680

image_size = 256
for top in range(-23, 1):
    top_pixels = top * image_size
    folder_top = get_folder(top_pixels)
    for left in range(-1, 34):
        left_pixels = left * image_size
        folder_left = get_folder(left_pixels)
        
        folder = "t" + str(folder_top) + "/" + "l" + str(folder_left)
        image_name = "t" + str(top_pixels) + "l" + str(left_pixels) + ".png"
        
        if not path.exists("images/" + image_name):
            print("downloading " + folder + "/" + image_name)
            download(base_url + "/" + folder + "/" + image_name, download_folder + "/" + image_name)


template_url = "https://merian.bs.ch//tmp/kacache/merianplan/5000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-1536/l-1536/t-1563l-1280.png"
