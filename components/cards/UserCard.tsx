"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
    const router = useRouter();

    return (
        <article className="user-card">
            <div className="user-card_avatar border border-sky-800 rounded-2xl bg-sky-400/20 p-4">
                <Image
                    src={imgUrl}
                    alt="logo"
                    width={48}
                    height={48}
                    className="rounded-full cursor-pointer"
                    onClick={() => router.push(`/profile/${id}`)}
                />

                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-dark-1 cursor-pointer" onClick={() => router.push(`/profile/${id}`)}>{name}</h4>
                    <p className="text-small-medium text-gray-1">@{username}</p>
                </div>
            </div>
        </article>
    )
}

export default UserCard