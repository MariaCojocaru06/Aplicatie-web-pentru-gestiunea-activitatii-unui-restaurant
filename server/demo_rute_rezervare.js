const Rezervare = require("../models/Reservation")
const Masa = require("../models/Table")
const express = require("express");
const app = express();
const router = require("express").Router();
const { Op } = require('sequelize');
const e = require("express");
const Client = require("../models/Client")

router
    .post('/masa', async (req, res, next) => {
        try {

            await Masa.create(req.body);
            res.status(202).json({ message: "created" })


        } catch (error) {
            next(error)
        }
    })
    .get('/masa', async (req, res, next) => {
        try {

            const rezervare = await Masa.findAll();
            if (rezervare.length > 0) {
                res.status(202).json(rezervare);
            } else {
                res.status(404).json({ message: "not found" });
            }
        } catch (error) {
            next(error)
        }
    })
    .get('/rezervari', async (req, res, next) => {
        try {

            const rezervare = await Rezervare.findAll();
            if (rezervare.length > 0) {
                res.status(202).json(rezervare);
            } else {
                res.status(404).json({ message: "not found" });
            }
        } catch (error) {
            next(error)
        }
    })
    .post('/masa/:id/rezervare', async (req, res, next) => {
        try {
            const masa = await Masa.findByPk(req.params.id)
            if (masa) {
                const rezervare = await Rezervare.create(req.body);
                masa.addReservations(rezervare);
                await masa.save();
                res.status(202).json({ message: "created" })
            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }

    })

    .get('/masa/:id/rezervare', async (req, res, next) => {
        try {
            const masa = await Masa.findByPk(req.params.id)
            if (masa) {
                const rezervare = await masa.getReservations();
                res.json(rezervare)

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }

    })
    .put('/masa/:id/ocupare', async (req, res, next) => {
        try {
            const masa = await Masa.findByPk(req.params.id)
            if (masa) {
                masa.ocupata = 1
                await masa.save();
                res.status(202).json(masa)

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }
    })
    .put('/masa/:id', async (req, res, next) => {
        try {
            const masa = await Masa.findByPk(req.params.id)
            if (masa) {
                await masa.update(req.body)
                await masa.save();
                res.status(202).json({ message: "updated" })

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }
    })
    .get('/masa/:id', async (req, res, next) => {
        try {
            const masa = await Masa.findByPk(req.params.id)
            if (masa) {

                res.json(masa)

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }


    })
    //EXPORT
    .get('/export', async (request, response, next) => {
        try {
          const result = [];

          for (let u of await Rezervare.findAll()) {
            const client = await Client.findByPk(u.clientiId);
            const meeting = {
              data:u.data,
              detalii:u.detalii,
              ora_rezervare:u.ora_start+":00",
              numar_persoane:u.nrPersoane,
              masa_rezervara:u.masaId,
              nume_client:client.nume +" "+ client.prenume
             
              
            };
            
            result.push(meeting);
          }
          if (result.length > 0) {
            response.json(result);
          } else {
            response.sendStatus(204);
          }
        } catch (error) {
          next(error);
        }
      })
    .get('/filter', async (req, res, next) => {
        try {
            const query = {}
            let pageSize = 2;
            const allowedFilters = ['nrLocuri'];
            const filterKeys = Object.keys(req.query).filter(e => allowedFilters.indexOf(e) !== -1)
            if (filterKeys.length > 0) {
                query.where = {}
                for (const key of filterKeys) {
                    if(key == 'ocupat'){
                      let nextD = parseInt(req.query[key])+1
                      console.log(nextD)
                      query.where[key] = {
                        [Op.gte]: `%${req.query[key]}%`,
                        [Op.lte]: `%${nextD}%`
                      }
                    } else{
                 
                        query.where[key] = {
                            [Op.lte]: `%${req.query[key]}%`
                        }
                    }
                }
            } if (req.query.sortOrder && req.query.sortOrder === '-1') {
                sortOrder = 'DESC'
            }

            if (req.query.pageSize) {
                pageSize = parseInt(req.query.pageSize)
            }
            if (req.query.sort) {
                query.order = [[Sequelize.fn('lower', Sequelize.col(req.query.sort)), req.query.how ? req.query.how : 'ASC']]
            }
            if (!isNaN(parseInt(req.query.page))) {
                query.limit = pageSize
                query.offset = pageSize * parseInt(req.query.page)
            }

            if (req.query.sort) {
                query.order = [[Sequelize.fn('lower', Sequelize.col(req.query.sort)), req.query.how ? req.query.how : 'ASC']]
            }

            const records = await Masa.findAndCountAll(query);
            res.status(200).json(records);
        } catch (err) {
            console.log(err.message + ' ' + req)
            next(err);
        }
    })

//Mesele raman predefinite
module.exports = router