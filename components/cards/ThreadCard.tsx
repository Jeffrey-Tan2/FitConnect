import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    }
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: boolean;
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    createdAt,
    comments,
    isComment,
} : Props) => {
    return (
        <article className={`flex w-full flex-col rounded-3xl ${isComment ? 'p-5 xs:px-7' : 'bg-gray-300 p-5 border-gray-500 border-2'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image
                                src={author.image}
                                alt="Profile image"
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-base-semibold text-dark-1">{author.name}</h4>
                        </Link>

                        <p className="mt-2 text-small-regular text-dark-1">{content}</p>

                        <div className={`${isComment && 'mb-1'} mt-3 flex flex-col gap-3`}>
                            <div className="flex gap-3.5">
                                <Link href={`/thread/${id}`}>
                                    <Image src="/assets/reply.svg" alt="reply" width={24} height={24} className="cursor-pointer object-contain"/>
                                </Link>
                                <p className='mt-2 text-subtle-medium text-dark-2'>Posted at {formatDateString(createdAt)}</p>
                            </div>

                            {comments.length > 0 && (
                                <div className='ml-1 mt-1 flex items-center gap-2'>
                                {comments.slice(0, 2).map((comment, index) => (
                                    <Image
                                    key={index}
                                    src={comment.author.image}
                                    alt={`user_${index}`}
                                    width={24}
                                    height={24}
                                    className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                                    />
                                ))}

                                <Link href={`/thread/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-dark-2'>
                                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                    </p>
                                </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <DeleteThread
                    threadId={JSON.stringify(id)}
                    currentUserId={currentUserId}
                    authorId={author.id}
                    parentId={parentId}
                    isComment={isComment}
                />
            </div>
        </article>
    )
}

export default ThreadCard;