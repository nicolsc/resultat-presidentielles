for ((i=1;i<10;i++));
do
	#curl http://www.francetv.fr/resultats/resultats/1995/presidential/1/department/0$i.json >> ../frontend/data/1995/1/departments/0$i.json
   #curl http://www.francetv.fr/resultats/resultats/1995/presidential/2/department/0$i.json >> ../frontend/data/1995/2/departments/0$i.json
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/0$i.json >> ../frontend/data/2002/1/departments/0$i.json
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/0$i.json >> ../frontend/data/2002/2/departments/0$i.json
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/0$i.json >> ../frontend/data/2007/1/departments/0$i.json
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/0$i.json >> ../frontend/data/2007/2/departments/0$i.json

   echo $i
done


for ((i=10;i<100;i++));
do
   #curl http://www.francetv.fr/resultats/resultats/1995/presidential/1/department/$i.json >> ../frontend/data/1995/1/departments/$i.json
   #curl http://www.francetv.fr/resultats/resultats/1995/presidential/2/department/$i.json >> ../frontend/data/1995/2/departments/$i.json
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/department/$i.json >> ../frontend/data/2002/1/departments/$i.json
   curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/department/$i.json >> ../frontend/data/2002/2/departments/$i.json
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/department/$i.json >> ../frontend/data/2007/1/departments/$i.json
   curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/department/$i.json >> ../frontend/data/2007/2/departments/$i.json
   echo $i
done

#curl http://www.francetv.fr/resultats/resultats/1995/presidential/1/national/france.json >> ../frontend/data/1995/1/national.json
#curl http://www.francetv.fr/resultats/resultats/1995/presidential/2/national/france.json >> ../frontend/data/1995/2/national.json
curl http://www.francetv.fr/resultats/resultats/2002/presidential/1/national/france.json >> ../frontend/data/2002/1/national.json
curl http://www.francetv.fr/resultats/resultats/2002/presidential/2/national/france.json >> ../frontend/data/2002/2/national.json
curl http://www.francetv.fr/resultats/resultats/2007/presidential/1/national/france.json >> ../frontend/data/2007/1/national.json
curl http://www.francetv.fr/resultats/resultats/2007/presidential/2/national/france.json >> ../frontend/data/2007/2/national.json