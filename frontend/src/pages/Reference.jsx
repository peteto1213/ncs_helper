import React from 'react'
import { FaBook } from 'react-icons/fa'
import SingleReference from '../components/SingleReference'

function Reference() {
  return (
    <section className='reference'>

        <div className="heading">
            <FaBook />
            <h1>References</h1>
        </div>

        <SingleReference 
            title = "Homepage background image 1"
            description = "Reddit - r/pics. (2020). Green Pine Trees Covered With Fogs Under White Sky. retrieved from: https://www.reddit.com/r/pics/comments/hx5pvu green_pine_trees_covered_with_fogs_under_white_sky/"
        />

        <SingleReference 
            title = "Homepage background image 2"
            description = "Freepik. (2021). The 2021 new year journey and future vision concept. retrieved from: https://www.freepik.com/premium-photo/2021-new-year-journey-future-vision-concept-businessman-traveling-highway-road-leading-forward-happy-new-year-celebration-beginning-2021-fresh-successful-start_20128686.htm"
        />

        <SingleReference 
            title = "Dashboard guide image"
            description = "Corey Moseley. (2019). 7 reasons why collaboration is important. retrieved from: https://blog.jostle.me/blog/why-collaboration-is-important"
        />

        <SingleReference 
            title = "Dashboard blog image"
            description = "Robb Sutton. (2019). How Do I Get Products For FREE to Review On My Blog?. retrieved from: https://www.incomediary.com/how-to-start-a-review-blog-and-get-free-review-products/"
        />

        <SingleReference 
            title = "Dashboard feedback image"
            description = "Frederik Nielsen. (2019). Guide to Evaluating Events: 10 Steps to Measure Your Success. retrieved from: https://billetto.co.uk/blog/guide-to-evaluating-events/"
        />

        <SingleReference 
            title = "Dashboard password image"
            description = "Dan Middleton. (2022). Modern Data Protection: How organisations can protect against cyber attacks. retrieved from: https://www.financedigest.com/modern-data-protection-how-organisations-can-protect-against-cyber-attacks.html"
        />

        <SingleReference 
            title = "Dashboard setting image"
            description = "Flimgrab. (2022). Modern Times. retrieved from: https://film-grab.com/2014/08/20/modern-times/"
        />

    </section>
  )
}

export default Reference
