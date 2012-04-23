   echo "define([], function(){ return({" > ../frontend/data/2002/1/departments/all.js
   echo "define([], function(){ return({" > ../frontend/data/2002/2/departments/all.js
   echo "define([], function(){ return({" > ../frontend/data/2007/1/departments/all.js
   echo "define([], function(){ return({" > ../frontend/data/2007/2/departments/all.js



for ((i=1;i<10;i++));
do
	#curl http://www.francetv.fr/resultats/resultats/1995/presidential/1/department/0$i.json >> ../frontend/data/1995/1/departments/0$i.json
   #curl http://www.francetv.fr/resultats/resultats/1995/presidential/2/department/0$i.json >> ../frontend/data/1995/2/departments/0$i.json
   # echo "define([], function(){return(" > ../frontend/data/2002/1/departments/0$i.js
   # echo "define([], function(){return(" > ../frontend/data/2002/2/departments/0$i.js
   # echo "define([], function(){return(" > ../frontend/data/2007/1/departments/0$i.js
   # echo "define([], function(){return(" > ../frontend/data/2007/2/departments/0$i.js


   echo "'0$i'": >> ../frontend/data/2002/1/departments/all.js
   echo "'0$i'": >> ../frontend/data/2002/2/departments/all.js
   echo "'0$i'": >> ../frontend/data/2007/1/departments/all.js
   echo "'0$i'": >> ../frontend/data/2007/2/departments/all.js

   # curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/0$i.json >> ../frontend/data/2002/1/departments/0$i.js
   # curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/0$i.json >> ../frontend/data/2002/2/departments/0$i.js
   # curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/0$i.json >> ../frontend/data/2007/1/departments/0$i.js
   # curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/0$i.json >> ../frontend/data/2007/2/departments/0$i.js


   # echo ")});" >> ../frontend/data/2002/1/departments/0$i.js
   # echo ")});" >> ../frontend/data/2002/2/departments/0$i.js
   # echo ")});" >> ../frontend/data/2007/1/departments/0$i.js
   # echo ")});" >> ../frontend/data/2007/2/departments/0$i.js
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/0$i.json >> ../frontend/data/2002/1/departments/all.js
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/0$i.json >> ../frontend/data/2002/2/departments/all.js
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/0$i.json >> ../frontend/data/2007/1/departments/all.js
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/0$i.json >> ../frontend/data/2007/2/departments/all.js
   echo ', ' >> ../frontend/data/2002/1/departments/all.js
   echo ', ' >> ../frontend/data/2002/2/departments/all.js
   echo ', ' >> ../frontend/data/2007/1/departments/all.js
   echo ', ' >> ../frontend/data/2007/2/departments/all.js

done
   

for ((i=10;i<96;i++));
do
   # echo "define([], function(){return(" > ../frontend/data/2002/1/departments/$i.js
   # echo "define([], function(){return(" > ../frontend/data/2002/2/departments/$i.js
   # echo "define([], function(){return(" > ../frontend/data/2007/1/departments/$i.js
   # echo "define([], function(){return(" > ../frontend/data/2007/2/departments/$i.js
   # #curl http://www.francetv.fr/resultats/resultats/1995/presidential/1/department/$i.json >> ../frontend/data/1995/1/departments/$i.json
   # #curl http://www.francetv.fr/resultats/resultats/1995/presidential/2/department/$i.json >> ../frontend/data/1995/2/departments/$i.json
   # curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/$i.json >> ../frontend/data/2002/1/departments/$i.js
   # curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/$i.json >> ../frontend/data/2002/2/departments/$i.js
   # curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/$i.json >> ../frontend/data/2007/1/departments/$i.js
   # curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/$i.json >> ../frontend/data/2007/2/departments/$i.js
   
   # echo ")});" >> ../frontend/data/2002/1/departments/$i.js
   # echo ")});" >> ../frontend/data/2002/2/departments/$i.js
   # echo ")});" >> ../frontend/data/2007/1/departments/$i.js
   # echo ")});" >> ../frontend/data/2007/2/departments/$i.js


   echo "'$i'": >> ../frontend/data/2002/1/departments/all.js
   echo "'$i'": >> ../frontend/data/2002/2/departments/all.js
   echo "'$i'": >> ../frontend/data/2007/1/departments/all.js
   echo "'$i'": >> ../frontend/data/2007/2/departments/all.js
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/$i.json >> ../frontend/data/2002/1/departments/all.js
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/$i.json >> ../frontend/data/2002/2/departments/all.js
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/$i.json >> ../frontend/data/2007/1/departments/all.js
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/$i.json >> ../frontend/data/2007/2/departments/all.js
   echo ', ' >> ../frontend/data/2002/1/departments/all.js
   echo ', ' >> ../frontend/data/2002/2/departments/all.js
   echo ', ' >> ../frontend/data/2007/1/departments/all.js
   echo ', ' >> ../frontend/data/2007/2/departments/all.js


done

#corse
# echo "define([], function(){return(" > ../frontend/data/2002/1/departments/2a.js
# echo "define([], function(){return(" > ../frontend/data/2002/2/departments/2a.js
# echo "define([], function(){return(" > ../frontend/data/2007/1/departments/2a.js
# echo "define([], function(){return(" > ../frontend/data/2007/2/departments/2a.js
# echo "define([], function(){return(" > ../frontend/data/2002/1/departments/2b.js
# echo "define([], function(){return(" > ../frontend/data/2002/2/departments/2b.js
# echo "define([], function(){return(" > ../frontend/data/2007/1/departments/2b.js
# echo "define([], function(){return(" > ../frontend/data/2007/2/departments/2b.js
# curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/2A.json >> ../frontend/data/2002/1/departments/2a.js
# curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/2B.json >> ../frontend/data/2002/1/departments/2b.js
# curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/2A.json >> ../frontend/data/2002/2/departments/2a.js
# curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/2B.json >> ../frontend/data/2002/2/departments/2b.js
# curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/2A.json >> ../frontend/data/2007/1/departments/2a.js
# curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/2B.json >> ../frontend/data/2007/1/departments/2b.js
# curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/2A.json >> ../frontend/data/2007/2/departments/2a.js
# curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/2B.json >> ../frontend/data/2007/2/departments/2b.js
# echo ")});" >> ../frontend/data/2002/1/departments/2a.js
# echo ")});" >> ../frontend/data/2002/2/departments/2a.js
# echo ")});" >> ../frontend/data/2007/1/departments/2a.js
# echo ")});" >> ../frontend/data/2007/2/departments/2a.js
# echo ")});" >> ../frontend/data/2002/1/departments/2b.js
# echo ")});" >> ../frontend/data/2002/2/departments/2b.js
# echo ")});" >> ../frontend/data/2007/1/departments/2b.js
# echo ")});" >> ../frontend/data/2007/2/departments/2b.js

echo "'2A'": >> ../frontend/data/2002/1/departments/all.js
echo "'2A'": >> ../frontend/data/2002/2/departments/all.js
echo "'2A'": >> ../frontend/data/2007/1/departments/all.js
echo "'2A'": >> ../frontend/data/2007/2/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/2A.json >> ../frontend/data/2002/1/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/2A.json >> ../frontend/data/2002/2/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/2A.json >> ../frontend/data/2007/1/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/2A.json >> ../frontend/data/2007/2/departments/all.js

echo ', ' >> ../frontend/data/2002/1/departments/all.js
echo ', ' >> ../frontend/data/2002/2/departments/all.js
echo ', ' >> ../frontend/data/2007/1/departments/all.js
echo ', ' >> ../frontend/data/2007/2/departments/all.js

echo "'2B'": >> ../frontend/data/2002/1/departments/all.js
echo "'2B'": >> ../frontend/data/2002/2/departments/all.js
echo "'2B'": >> ../frontend/data/2007/1/departments/all.js
echo "'2B'": >> ../frontend/data/2007/2/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/2B.json >> ../frontend/data/2002/1/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/2B.json >> ../frontend/data/2002/2/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/2B.json >> ../frontend/data/2007/1/departments/all.js
curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/2B.json >> ../frontend/data/2007/2/departments/all.js


echo "})});" >> ../frontend/data/2002/1/departments/all.js
echo "})});" >> ../frontend/data/2002/2/departments/all.js
echo "})});" >> ../frontend/data/2007/1/departments/all.js
echo "})});" >> ../frontend/data/2007/2/departments/all.js


echo "define([], function(){ return(" > ../frontend/data/2002/1/national.js
echo "define([], function(){return(" > ../frontend/data/2002/2/national.js
echo "define([], function(){return(" > ../frontend/data/2007/1/national.js
echo "define([], function(){return(" > ../frontend/data/2007/2/national.js
#curl http://www.francetv.fr/resultats/resultats/1995/presidential/1/national/france.json >> ../frontend/data/1995/1/national.json
#curl http://www.francetv.fr/resultats/resultats/1995/presidential/2/national/france.json >> ../frontend/data/1995/2/national.json
curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/national/france.json >> ../frontend/data/2002/1/national.js
curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/national/france.json >> ../frontend/data/2002/2/national.js
curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/national/france.json >> ../frontend/data/2007/1/national.js
curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/national/france.json >> ../frontend/data/2007/2/national.js
echo ")});" >> ../frontend/data/2002/1/national.js
echo ")});" >> ../frontend/data/2002/2/national.js
echo ")});" >> ../frontend/data/2007/1/national.js
echo ")});" >> ../frontend/data/2007/2/national.js