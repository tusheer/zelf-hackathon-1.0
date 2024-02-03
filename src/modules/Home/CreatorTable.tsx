import { useQuery } from 'react-query';
import styles from './Home.module.css';
import Avatar from '@/components/Avatar';

const formatDate = (dateString: string) => {
    const options = { month: 'short', day: 'numeric' } as const;
    return new Date(dateString).toLocaleDateString('en-US', options);
};

type ContentData = {
    id: number;
    uuid: string;
    account: number;
    creator?: null;
    external_id: string;
    external_url: string;
    timestamp: string;
    title: string;
    text: string;
    thumbnail_url: string;
    content_platform: string;
    content_type?: null;
    content_form: string;
    likes: number;
    comments: number;
    views: number;
    shares: number;
    total_engagement: number;
    engagement_of_views: number;
    engagement_of_followers: number;
    creator_follower_count?: number;
    creator_active_content_count?: number;
};

type CreatorData = {
    id: number;
    followers: number;
    username: string;
    external_id: string;
    external_url: string;
    name: string;
    email: string;
    platform: string;
    profile_text: string;
    profile_picture_url: string;
    follower_count: string;
    active_content_count?: string;
};

type Content = {
    creator: CreatorData;
    content: ContentData;
};

type ApiResponse = {
    page: number;
    next: number;
    data: Content[];
    total_contents: number;
    page_size: number;
};

const fetchContents = async () => {
    const res = await fetch('https://hackapi.hellozelf.com/frontend/api/v1/contents?page=1');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const useGetContent = () => {
    return useQuery<ApiResponse>({
        queryKey: ['contents'],
        queryFn: fetchContents,
    });
};

function convertToKOrM(value : number) {
    if (value < 1000) {
        return value.toString(); // return the same number if it's less than 1000
    } else if (value < 1000000) {
        return (value / 1000).toFixed(1) + 'K'; // convert to 'K' for thousands
    } else {
        return (value / 1000000).toFixed(1) + 'M'; // convert to 'M' for millions
    }
}

function decimalToPercentage(decimalValue : number) {
    return (decimalValue * 100).toFixed(2) + '%';
  }


const CreatorTable = () => {
    const { data } = useGetContent();

    return (
        <div className='table-container'>
            <div
                style={{
                    overflow: 'hidden',
                    borderRadius: '6px',
                    border: '1px solid #e3e4e8',
                }}
            >
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th align='left'>Date</th>
                            <th align='left'>Video</th>
                            <th align='left'>Creator</th>
                            <th align='center'>Platform</th>
                            <th align='center'>
                                <div>Total views</div>
                            </th>
                            <th align='center'>Total engagement</th>
                            <th align='center'>Engagement rate</th>
                            <th align='right' className={styles.action}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.map((item, index) => (
                            <tr key={index}>
                                <td className={styles.date}>{formatDate(item.content.timestamp)}</td>
                                <td>
                                    <div
                                        style={{
                                            display: 'flex',
                                        }}
                                    >
                                        <span className={styles.video}>
                                            <svg width='11' height='13' viewBox='0 0 11 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M10.1211 5.12891C10.5039 5.375 10.75 5.8125 10.75 6.25C10.75 6.71484 10.5039 7.15234 10.1211 7.37109L2.24609 12.1836C1.83594 12.4297 1.31641 12.457 0.90625 12.2109C0.496094 11.9922 0.25 11.5547 0.25 11.0625V1.4375C0.25 0.972656 0.496094 0.535156 0.90625 0.316406C1.31641 0.0703125 1.83594 0.0703125 2.24609 0.34375L10.1211 5.12891Z'
                                                    fill='#3354FF'
                                                />
                                            </svg>
                                            <p>{item.content.external_url}</p>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.creator}>
                                        <Avatar
                                            width={24}
                                            height={24}
                                            defaultSrc='/assets/images/dummy-user.svg'
                                            src={item.creator.profile_picture_url}
                                        />
                                        @{item.creator.username}
                                    </div>
                                </td>
                                <td align='center'>{item.content.content_platform == 'tiktok' ? <TiktokIcon /> : <InstagramIcon />} </td>
                                <td align='center'>{convertToKOrM(item.content.views)}</td>
                                <td align='center'> {convertToKOrM(item.content.total_engagement)}</td>
                                <td align='center'>{decimalToPercentage(item.content.engagement_of_views)}</td>
                                <td align='right'>
                                    <button className={styles.button}>View post</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const InstagramIcon = () => {
    return (
        <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12.5 4C14.8095 4 15.0976 4.0085 16.0037 4.051C16.9089 4.0935 17.5252 4.23545 18.0675 4.44625C18.6285 4.66215 19.1011 4.95455 19.5737 5.4263C20.0059 5.85121 20.3404 6.3652 20.5538 6.9325C20.7637 7.47395 20.9065 8.09105 20.949 8.9963C20.989 9.9024 21 10.1906 21 12.5C21 14.8095 20.9915 15.0976 20.949 16.0037C20.9065 16.9089 20.7637 17.5252 20.5538 18.0675C20.341 18.6351 20.0065 19.1492 19.5737 19.5737C19.1487 20.0058 18.6347 20.3402 18.0675 20.5538C17.526 20.7637 16.9089 20.9065 16.0037 20.949C15.0976 20.989 14.8095 21 12.5 21C10.1906 21 9.9024 20.9915 8.9963 20.949C8.09105 20.9065 7.4748 20.7637 6.9325 20.5538C6.36498 20.3408 5.8509 20.0063 5.4263 19.5737C4.994 19.1489 4.65954 18.6348 4.44625 18.0675C4.23545 17.526 4.0935 16.9089 4.051 16.0037C4.01105 15.0976 4 14.8095 4 12.5C4 10.1906 4.0085 9.9024 4.051 8.9963C4.0935 8.0902 4.23545 7.4748 4.44625 6.9325C4.65895 6.36485 4.99348 5.85072 5.4263 5.4263C5.85102 4.99385 6.36506 4.65937 6.9325 4.44625C7.4748 4.23545 8.0902 4.0935 8.9963 4.051C9.9024 4.01105 10.1906 4 12.5 4ZM12.5 8.25C11.3728 8.25 10.2918 8.69777 9.4948 9.4948C8.69777 10.2918 8.25 11.3728 8.25 12.5C8.25 13.6272 8.69777 14.7082 9.4948 15.5052C10.2918 16.3022 11.3728 16.75 12.5 16.75C13.6272 16.75 14.7082 16.3022 15.5052 15.5052C16.3022 14.7082 16.75 13.6272 16.75 12.5C16.75 11.3728 16.3022 10.2918 15.5052 9.4948C14.7082 8.69777 13.6272 8.25 12.5 8.25ZM18.025 8.0375C18.025 7.75571 17.9131 7.48546 17.7138 7.2862C17.5145 7.08694 17.2443 6.975 16.9625 6.975C16.6807 6.975 16.4105 7.08694 16.2112 7.2862C16.0119 7.48546 15.9 7.75571 15.9 8.0375C15.9 8.31929 16.0119 8.58954 16.2112 8.7888C16.4105 8.98806 16.6807 9.1 16.9625 9.1C17.2443 9.1 17.5145 8.98806 17.7138 8.7888C17.9131 8.58954 18.025 8.31929 18.025 8.0375ZM12.5 9.95C13.1763 9.95 13.8249 10.2187 14.3031 10.6969C14.7813 11.1751 15.05 11.8237 15.05 12.5C15.05 13.1763 14.7813 13.8249 14.3031 14.3031C13.8249 14.7813 13.1763 15.05 12.5 15.05C11.8237 15.05 11.1751 14.7813 10.6969 14.3031C10.2187 13.8249 9.95 13.1763 9.95 12.5C9.95 11.8237 10.2187 11.1751 10.6969 10.6969C11.1751 10.2187 11.8237 9.95 12.5 9.95Z'
                fill='url(#paint0_radial_73_2762)'
            />
            <defs>
                <radialGradient
                    id='paint0_radial_73_2762'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(5.10022 20.6276) scale(21.5837)'
                >
                    <stop offset='0.09' stop-color='#FA8F21' />
                    <stop offset='0.78' stop-color='#D82D7E' />
                </radialGradient>
            </defs>
        </svg>
    );
};

const TiktokIcon = () => {
    return (
        <svg width='21' height='23' viewBox='0 0 21 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_73_2815)'>
                <path
                    d='M7.01616 9.96594V9.26249C6.77197 9.22383 6.52534 9.20265 6.27815 9.19911C3.8849 9.194 1.7661 10.7449 1.0474 13.0277C0.328711 15.3104 1.17704 17.7954 3.14146 19.1622C2.4211 18.3913 1.93928 17.4283 1.75416 16.3896C1.56903 15.3508 1.68851 14.2807 2.09817 13.3084C2.50784 12.336 3.19018 11.503 4.06283 10.91C4.93548 10.3169 5.96113 9.98903 7.016 9.96602L7.01616 9.96594Z'
                    fill='#25F4EE'
                />
                <path
                    d='M7.14895 17.9342C8.48703 17.9323 9.5869 16.8782 9.64549 15.5414V3.61215H11.8248C11.7803 3.36288 11.7591 3.11001 11.7614 2.85681L8.78056 2.85681V14.7746C8.73098 16.1182 7.62848 17.1824 6.28401 17.1846C5.88223 17.1812 5.48701 17.0824 5.13089 16.8963C5.3617 17.2161 5.66481 17.4768 6.01551 17.6572C6.36622 17.8375 6.75459 17.9324 7.14895 17.9342ZM15.8954 7.65961V6.99656C15.0933 6.99687 14.3091 6.7602 13.6411 6.31626C14.2266 6.99703 15.018 7.46859 15.8954 7.65961Z'
                    fill='#25F4EE'
                />
                <path
                    d='M13.641 6.31625C12.9829 5.56691 12.6201 4.60361 12.6204 3.60632H11.8247C11.9275 4.15771 12.1415 4.68238 12.4538 5.1483C12.7661 5.61422 13.17 6.01162 13.641 6.31625ZM6.27815 12.18C5.72007 12.1828 5.17895 12.3721 4.74083 12.7178C4.30271 13.0635 3.99274 13.5458 3.86018 14.0879C3.72763 14.63 3.78011 15.2009 4.00927 15.7097C4.23844 16.2186 4.63114 16.6362 5.12495 16.8963C4.85496 16.5235 4.69328 16.0834 4.65777 15.6245C4.62226 15.1656 4.7143 14.7058 4.92372 14.2959C5.13315 13.886 5.4518 13.542 5.84447 13.3019C6.23715 13.0618 6.68856 12.9349 7.14883 12.9352C7.39906 12.9385 7.64754 12.9774 7.88677 13.0509V10.0178C7.64246 9.98118 7.39587 9.96192 7.14883 9.96017H7.01616V12.2664C6.77566 12.2019 6.52704 12.1728 6.27815 12.18Z'
                    fill='#FE2C55'
                />
                <path
                    d='M15.8953 7.65961V9.96593C14.4105 9.96304 12.9642 9.49304 11.7613 8.6225V14.6823C11.7549 17.706 9.30189 20.154 6.27815 20.154C5.15514 20.156 4.05918 19.8095 3.14145 19.1623C3.8898 19.9672 4.86322 20.5281 5.93489 20.7719C7.00657 21.0157 8.12683 20.9312 9.14976 20.5292C10.1727 20.1273 11.0509 19.4266 11.6699 18.5185C12.289 17.6104 12.6202 16.5368 12.6204 15.4378V9.39516C13.8273 10.26 15.2754 10.7238 16.7602 10.7213V7.75165C16.4695 7.75078 16.1797 7.71994 15.8953 7.65961Z'
                    fill='#FE2C55'
                />
                <path
                    d='M11.7613 14.6823V8.62249C12.9678 9.48807 14.4162 9.95202 15.901 9.9486V7.64236C15.0238 7.4571 14.2306 6.99167 13.641 6.31625C13.17 6.01162 12.7661 5.61422 12.4538 5.1483C12.1415 4.68238 11.9275 4.15771 11.8247 3.60632H9.64538V15.5415C9.62417 16.061 9.44164 16.561 9.12317 16.9721C8.8047 17.3831 8.36611 17.6847 7.86835 17.8349C7.37058 17.9852 6.83837 17.9767 6.34568 17.8105C5.85298 17.6444 5.42427 17.3289 5.11912 16.9079C4.62523 16.6479 4.23245 16.2303 4.00322 15.7214C3.77399 15.2125 3.72149 14.6416 3.85405 14.0994C3.98661 13.5572 4.29663 13.0749 4.73482 12.7292C5.173 12.3835 5.71419 12.1942 6.27232 12.1915C6.52263 12.1937 6.77127 12.2325 7.01033 12.3068V10.0005C5.9498 10.0185 4.9174 10.3446 4.03903 10.9392C3.16066 11.5338 2.47426 12.3711 2.06353 13.349C1.65279 14.327 1.53547 15.4033 1.72587 16.4468C1.91626 17.4902 2.40614 18.4557 3.13579 19.2256C4.06254 19.8515 5.16005 20.1757 6.27815 20.1539C9.30188 20.1539 11.7549 17.706 11.7613 14.6823Z'
                    fill='black'
                />
            </g>
            <defs>
                <clipPath id='clip0_73_2815'>
                    <rect width='20.3426' height='23' fill='white' transform='translate(0.328705)' />
                </clipPath>
            </defs>
        </svg>
    );
};

const UpandDownIcon = () => {
    return (
        <svg width='16' height='23' viewBox='0 0 16 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M4.48438 8.21094L7.46094 5.21094C7.625 5.07031 7.8125 5 8 5C8.21094 5 8.39844 5.07031 8.53906 5.21094L11.5156 8.21094C11.75 8.42188 11.8203 8.75 11.7031 9.03125C11.5859 9.3125 11.3047 9.5 11 9.5H5.02344C4.71875 9.5 4.46094 9.3125 4.34375 9.03125C4.22656 8.75 4.27344 8.42188 4.48438 8.21094Z'
                fill='#ACAFB9'
            />
            <path
                d='M11.5156 14.7891L8.53906 17.7891C8.375 17.9297 8.1875 18 8 18C7.78906 18 7.60156 17.9297 7.46094 17.7891L4.48438 14.7891C4.25 14.5781 4.17969 14.25 4.29688 13.9688C4.41406 13.6875 4.69531 13.5 5 13.5H10.9766C11.2812 13.5 11.5391 13.6875 11.6562 13.9688C11.7734 14.25 11.7266 14.5781 11.5156 14.7891Z'
                fill='#ACAFB9'
            />
        </svg>
    );
};
export default CreatorTable;
