import React from 'react'

import Bar from '@/components/Bar'

const Home = () => {
    return (
        <div>
            <Bar
                title={'主流框架使用注意度'}
                xData={['react', 'vue', 'angluar']}
                yData={[30, 40, 50]}
                style={{ width: '500px', height: '400px' }}
            />
            <Bar
                title={'主流框架使用注意度'}
                xData={['react', 'vue', 'angluar']}
                yData={[30, 40, 50]}
                style={{ width: '500px', height: '400px' }}
            />
        </div>
    )
}

export default Home
