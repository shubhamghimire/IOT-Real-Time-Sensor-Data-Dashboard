import psycopg2
from datetime import datetime
import time
import random

while True:
    try:
        connection = psycopg2.connect(user="postgres",
                                    password="postgres",
                                    host="localhost",
                                    port="54326",
                                    database="postgres")

        cursor = connection.cursor()


        water_level = random.randint(1,8)
        temperature = random.randint(20,40)
        humidity = random.randint(25,80)
        pressure = random.randint(980,1020)

        # Inserting into mems_table
        cursor.execute("INSERT INTO mems_table(date_time,mems_date,mems_time, water_level, voltage1, voltage2, current1, current2, frequency, temperature, humidity, pressure, slopex, slopey, slopez, impactx, impacty, impactz, impact_status) VALUES ( %s, '2021/04/01', '16:04:00', %s, 12.5, 0, 6.0, 23.0, 38.68852, %s, %s, %s, -0.8, 8.7, 8.7, -0.67, -0.93, 0.82, '1111110' )",([datetime.now(), water_level, temperature, humidity , pressure]))

        # Inserting into cpsr_table
        cursor.execute("INSERT INTO cpsr_table(date_time,water_level,temperature,pressure,sensor_version) VALUES (%s,%s,%s,%s,'ver1.1.1')",([datetime.now() , water_level, temperature, pressure]))

        connection.commit()
        print("2 Record inserted successfully")


    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
    
    time.sleep(15)