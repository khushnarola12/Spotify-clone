'use client'

import LikeButton from "@/app/components/LikeButton";
import MediaItem from "@/app/components/MediaItem";
import useOnPlay from "@/app/hooks/useOnPlay";
import { useUser } from "@/app/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps{
    songs:Song[]
}

const LikedContet:React.FC<LikedContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs)
    const router = useRouter()
    const {isLoading,user} = useUser()

    useEffect(()=>{
        if(!isLoading&&!user){
            router.replace('/')
        }
    },[isLoading,user,router])

if(songs.length===0){
    return(
        <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
        ">
            No liked Songs
        </div>
    )
}

    return ( 
        <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
        ">
            {songs.map((song)=>(
                <div key={song.id} className="
                    flex
                    items-center
                    gap-x-4
                    w-full
                ">
                    <div className="flex-1">
                        <MediaItem data={song} onClick={(id:string)=>onPlay(id)}/>
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
     );
}
 
export default LikedContet;