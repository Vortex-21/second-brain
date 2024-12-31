import { atom } from 'recoil'
import { ModalTypes } from '../../ModalTypes'

export const ModalAtom = atom<ModalTypes>({
    key:"modalState", 
    default:"None"
})