#!/bin/bash
originDirPerso="./aTraiter/perso"
originDirLieu="./aTraiter/lieu"
mapDir="./views/mapsbis"
picturesDir="./views/picturesbis"

jsonFile="./mapsbis.js"

addData () {
    sed -i '$ s/.$//' $jsonFile
    echo -e \
    '"'$1'": { \n'\
    '    "infos": {\n'\
    '        "title": "'$1'",\n'\
    '        "description": "",\n'\
    '        "frames": "1",\n'\
    '    },\n'\
    '   "path": {}\n'\
    '},' >> $jsonFile
    echo "}" >> $jsonFile
}

analyse () {
    for f in $1/*.png; 
    do
        fileName=$(echo $f | rev | cut -d / -f 1 |rev| cut -d . -f 1)
        if [[ $fileName == '*' ]]; then continue; fi;
        cp $mapDir/defaultPerso.png $mapDir/$fileName.png
        cp $1/$fileName.png $picturesDir/$fileName.png
        convert -interpolate Integer -filter point -resize $2x$2 $picturesDir/$fileName.png $picturesDir/$fileName.png
        addData $fileName
    done;
}

analyse $originDirLieu 96
analyse $originDirPerso 64