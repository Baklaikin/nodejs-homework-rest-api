const express = require('express')
const router = express.Router()
const { contacts: ctrls } = require('../../controllers/index')

router.get('/', ctrls.getAll)

router.get('/:contactId', ctrls.getById)

router.post('/', ctrls.postContact)

router.delete('/:contactId', ctrls.deleteContact)

router.put('/:contactId', ctrls.changeContact)

module.exports = router
