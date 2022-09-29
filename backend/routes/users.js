
const{
    getUsers,
    getuser
} = require('../controllers/memberController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

//get all Members
router.get('/', getUsers)

//get a single Member
router.get('/:id', getUser)


module.exports = router