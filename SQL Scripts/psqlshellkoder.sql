--vi har brugt psql shell til at indsætte vores data ind i databasen

psql --host=mouse.db.elephantsql.com 
username=lzdkbzkl 
port=5432
dbname=lzdkbzkl
password 

\copy animal(species,at_risk,total,percent_at_risk,percent_remaining,description) FROM '/Users/sunmundur/Documents/Animal.csv' DELIMITER ';' CSV HEADER
/Users/sunmundur/Documents/Animal.csv

\copy climate(years,observations,best_case,worst_case) FROM '/Users/sunmundur/Documents/climate.csv' DELIMITER ',' CSV HEADER
/Users/sunmundur/Documents/climate.csv