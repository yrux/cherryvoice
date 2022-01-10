const sessionsetup = require('../sessionsetup')
const select = require('../db/select.js')
const insert = require('../db/insert.js')
const update = require('../db/update.js')
const validator = require('../validator/index.js')
const router = sessionsetup.router
router.route('/inquiry').get(async (req, res) => {
    if (req.session.login === true) {
        const query = new select
        try {
            let filter = '';
            var results = await query.get("select * from inquiries" + filter + " order by id desc")
            res.json(results)
        } catch (ex) {
            res.json({ error: true, data: ex })
        }
    } else {
        res.json({ error: true, data: "You are not authorized" })
    }
}).post(async (req, res) => {
    const validate = new validator(req.body)
    validate.addrules('first_name', 'required')
    validate.addrules('last_name', 'required')
    validate.addrules('work_email', 'required')
    validate.addrules('mobile', 'required')
    validate.addrules('title', 'required')
    validate.addrules('industry', 'required')
    validate.addrules('country', 'required')
    validate.addrules('details', 'required')
    const validation_result = validate.validate()
    if (!validate.isValid()) {
        res.status(400).json(validation_result);
    } else {
        const insert_record = new insert("inquiries", req.body)
        var inserted_id = await insert_record.add()
        const query = new select
        try {
            var home_banner = await query.first("select * from inquiries where `id` = ?", [inserted_id])
            res.json(home_banner)
        } catch (ex) {
            res.json({ error: true, data: ex })
        }
    }
})

router.route('/inquiry/:id').delete(async (req, res) => {
    if (req.session.login === true) {
        const query = new select
        try {
            query.get("DELETE from inquiries where id = " + req.params.id)
            res.json({ data: "Deleted" }).status(200)
        } catch (ex) {
            res.json({ error: true, data: ex })
        }
    } else {
        res.json({ error: true, data: "You are not authorized" })
    }
}).put(async (req, res) => {
    if (req.session.login === true) {
        const validate = new validator(req.body)
        const validation_result = validate.validate()
        if (!validate.isValid()) {
            res.status(400).json(validation_result);
        } else {
            const update_record = new update("inquiries", req.body, { id: req.params.id })
            await update_record.edit()
            const query = new select
            try {
                var home_banner = await query.first("select * from inquiries where `id` = ?", [req.params.id])
                res.json(home_banner)
            } catch (ex) {
                res.json({ error: true, data: ex })
            }
        }
    } else {
        res.json({ error: true, data: "You are not authorized" })
    }
})

module.exports = router