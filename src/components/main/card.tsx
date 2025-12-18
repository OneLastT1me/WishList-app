import DoneIcon from '@mui/icons-material/Done';
import { ReactNode } from 'react';

type Props = {
    id: number
    image: ReactNode
    lable: string
    text: string
    availability: boolean
    bg?: string
}

const Card = ({image, lable, text, availability, bg}: Props) => {
    return(
        <div style={{ backgroundColor: bg }} className={`flex-shrink-0 flex flex-col p-[10px] w-[250px] h-[240px] border-2 border-solid rounded-lg text-left snap-center `}>
            <div className="flex justify-between">
                {image}
                {availability && <DoneIcon/>}
            </div>
            <div className='py-[15px] text-sl font-bold font-montserrat'>
                <p className=' font-montserrat'>{lable}</p>
            </div>
            <p>{text}</p>
        </div>
    )
} 

export default Card 