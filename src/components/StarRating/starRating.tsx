import { useState } from "react";


function StarRating() {

    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    return (
        <div >
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={index}
                        onClick={() => handleRatingChange(starValue)}
                        className={`text-2xl focus:outline-none ${starValue <= rating ? 'text-[#FFA000]' : 'text-gray-300'}`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
}

export default StarRating;