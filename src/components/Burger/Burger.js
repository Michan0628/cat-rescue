import React, {useState} from 'react'
import './style.scss'
import { Fade as Hamburger } from 'hamburger-react'
import Menu from '../Menu/Menu'
import { Animation } from 'rsuite';

const { Collapse} = Animation;

export default function Burger(props) {

    const [isOpen, setOpen]=useState(false)

    return (
        <div>
            <Hamburger toggled={isOpen} toggle={setOpen} color='#58B5C9' rounded/>
        </div>
    )
}
