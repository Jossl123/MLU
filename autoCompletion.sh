for f in ./aTraiter/*.png; 
do 
    fileName=$(echo $f | cut -d / -f 3 | cut -d . -f 1)
    cp ./views/maps/defaultPerso.png ./views/maps/$fileName.png
    mv ./aTraiter/$fileName.png ./views/pictures/$fileName.png
done;