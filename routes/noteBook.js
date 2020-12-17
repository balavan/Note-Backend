const router = require('express').Router()
const noteBook = require('../models/noteBook');




router.post('/saveNote', async (req, res) => {
    //Create noteBook model
    const notebook = new noteBook({
        header: req.body.header,
        note: req.body.note,
        date: req.body.date,
    });
    try {

        if (req.body.date == '' || req.body.header == '' || req.body.note == '') {
            res.send({
                status: 400,
                message: "invalid payload"
            })
        }

        //Save Data
        const savedNoteBook = await notebook.save(req.body);

        //return Response
        res.send({
            status: 'success',
            data: {
                name: savedNoteBook.header
            }
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'error',
            message: err
        });
    }
});
router.post('/updateNote', async (req, res) => {
    try {
        //Update model
        if (req.body.date == '' || req.body.header == '' || req.body.note == '') {
            res.send({
                status: 400,
                message: "invalid payload"
            })
        }
        //Update Note
        const updateNoteBook = await noteBook.updateOne({
            "_id": req.body._id
        }, {
            $set: {
                "header": req.body.header,
                "note": req.body.note,
                "date": req.body.date,
            }
        });
        if (updateNoteBook.nModified >= 0) {
            res.send({
                status: 'success',
                data: {
                    name: true
                }
            });
        }


    } catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'error',
            message: err
        });
    }
});

router.get('/getList', async (req, res) => {
    try {
        //Get All Notes
        const listOfdata = await noteBook.find();
        if (listOfdata.length < 1) return res.status(400).send({
            status: 'error',
            message: 'No Data Found'
        });
        res.send({
            status: 'success',
            data: listOfdata
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'error',
            message: err
        });
    }
});
router.get('/getSingleNote/:mongoId', async (req, res) => {
    try {
        //Get Single Note 
        const singleNote = await noteBook.findOne({
            _id: req.params.mongoId
        }, {
            "createdDate": 0,
            "__v": 0
        });
        if (singleNote == null) return res.status(400).send({
            status: 'error',
            message: 'No Data Found'
        });
        res.send({
            status: 'success',
            data: singleNote
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'error',
            message: err
        });
    }
});


module.exports = router;