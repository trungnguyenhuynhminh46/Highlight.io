import { Dialog, DialogTrigger } from '@/common/components/ui/Modal';
import { Home, LucideIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { DialogDemo } from './modals/ProfileModal';
import { cn } from '@/common/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';

interface ProfileProps {
    Leaderboard: Array<{
        img: string;
        name: string;
        score: number;
        host: boolean;
        type?: string;
        icon?: LucideIcon;
    }>;
}

const UserFrame: React.FC<ProfileProps> = ({ Leaderboard }) => {

    const [userSelected, setUserSelected] = useState(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const handleLinkClick = (value: any) => {
        setUserSelected(value)
        triggerRef.current?.click()
    };
    const renderItem = (data: typeof Leaderboard) => (
        <>
            {data.map((value, _index) => (
                <a href="#" className="group block" onClick={() => handleLinkClick(value)}>
                    <li className="py-3 sm:py-4 flex">
                        <div className="flex items-center space-x-3">        
                            <div className={cn('flex items-center space-x-4 w-[40px]', value.type)}>
                                {value.icon && <value.icon size={36} strokeWidth={3.5} />}
                            </div>
                            <div className={cn('flex items-center space-x-4', value.type)}>
                                <Avatar className="flex items-center bg-yellow-300 w-1/5 h-auto rounded-full group-hover:scale-110">
                                    <AvatarImage src={value?.img} alt="avatar" />
                                    <AvatarFallback>Avatar</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-medium text-truncate dark:text-white">
                                        {value.name}
                                    </p>
                                    <p className="text-sm text-textBlueColor truncate dark:text-gray-400">
                                        {value.score}
                                    </p>
                                </div>
                                {value.host && <Home color="#2062fb" strokeWidth={2.5} />}
                            </div>
                        </div>
                    </li>
                </a>

            ))}
        </>
    );

    return (
        <div id="profile" className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 bg-center self-center">
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {renderItem(Leaderboard)}
                </ul>
            </div>
            { }
            <Dialog>
                <DialogTrigger ref={triggerRef}>
                </DialogTrigger>
                <DialogDemo user={userSelected} />
            </Dialog>
        </div>
    );
};

export default UserFrame;
