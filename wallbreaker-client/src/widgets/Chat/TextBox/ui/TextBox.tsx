import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import classes from './TextBox.module.scss'
import Button, { ThemeButton } from 'shared/ui/Button/Button'
import Input, { ThemeInput } from 'shared/ui/Input/Input'
import { WSContext } from 'app/providers/WsProvider/ui/WsProvider'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

interface TextBoxProps {
    className?: string
}

const TextBox: FC<TextBoxProps> = props => {
    const ws = useContext(WSContext)

    const { id } = useTypedSelector(s => s.conversation)

    const [text, setText] = useState('')

    const sendMessage = () => {
        if (text) {
            ws.sendMessage(id, text)
            setText('')
        }
    }

    useEffect(() => {
        addEventListener('keydown', handleKey)

        return () => {
            removeEventListener('keydown', handleKey)
        }
    }, [text])

    const handleKey = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                sendMessage()
                break
        }
    }

    return (
        <div className={[props.className, classes.textBox].join(' ')}>
            <Input
                value={text}
                onChange={(e) => { setText(e.target.value) }}
                theme={ThemeInput.CLEAR}
                className={classes.input}
                placeholder='Сообщение'
            />
            <Button
                onClick={sendMessage}
                theme={ThemeButton.CLEAR}
                className={classes.sendButton}
            >
                <FontAwesomeIcon icon={faPaperPlane}/>
            </Button>
        </div>
    )
}

export default TextBox
