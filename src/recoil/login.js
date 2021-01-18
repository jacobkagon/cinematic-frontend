import {atom} from 'recoil'
import {selector, useRecoilState} from 'recoil'

const loggedInState = atom({
    key: "loggedInState",
    default: false
});

export default loggedInState;








