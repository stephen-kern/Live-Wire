import React from 'react';
import ReviewList from '../components/ReviewList'

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

const Setlist = () => {
    // logic here


    return (
        <main>
            <div className='flex-row justify-space-between'>
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ReviewList
                        reviews={reviews}
                        title="Let's see what's playing right now!"
                        />
                    )}
                </div>
            </div>
        </main>
    )
}