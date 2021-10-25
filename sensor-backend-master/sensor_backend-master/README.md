Backend application for realtime dashboard. 


## Installation
Requires node.js v10.10.0 or later

### Clone the repo:
```bash
$ git clone https://gitlab.com/realtime_app/sensor_backend.git 
```

### Run docker postgres database for sample dataset
write sql query on `/postgresql/docker-entrypoint-initdb.d/10_dummy_dataset.sql` to insert dummy datasets.  
Bydefaul postgres  port is exposed to `54326`.

```bash
$ cd sensor_backend
$ Run `docker-compose  up --build`
```


### Install project dependencies:

```bash
$ cd sensor_backend
$ Run `npm install`
$ Run in dev mode `npm run dev` 
$ By defaul app is running on port 3000 http://localhost3000
```


### API Endpoints
**Add new station**

`Post` `/api/v1/station` 
```json
{ 
     "stationName": "somethingStation",
     "sensorModel": "model",
     "sensorId": "mem_233",
     "deployedLocation": "longlat",
     "installationDate": ""
     "inspectionDate": ""
     "extraField": {}}
```

**Update existing station**

`Put` `/api/v1/station/:sensorId` 
```json
 {
    "stationName": "somethingStation",
    "sensorModel": "model",
    "sensorId": "mem_233",
    "deployedLocation": "longlat",
    "installationDate": ""
    "inspectionDate": ""
    "extraField": {}
 }
```

**Getting All Stations**

`GET` `/api/v1/station/all` 
```json
 [
        {
            "stationName": "station1",
            "sensorId": "station1_table"
        },
        {
            "stationName": "station2",
            "sensorId": "station2_table"
        }
 ]
```

**Getting Station By Id**

`GET` `/api/v1/station/:sensorId` 
```json
 {
      "id": 1,
      "stationName": "station_name",
      "sensorModel": "sensor_model",
      "sensorId": "sensor_table_name",
      "deployedLocation": "location",
      "installationDate": "installation_date",
      "inspectionDate": "inspection_date",
      "extraField": "{'num': '58', 'name': 'hello'}",
      "createdAt": "2021-04-07T04:33:14.896Z",
      "updatedAt": "2021-04-07T04:33:14.896Z"
}
```

**Getting Station Data By Id on First Dashboard Load**

`GET` `/api/v1/station/:sensorId/latest` 
```json
 {
      "data": "data_parameters"
}
```