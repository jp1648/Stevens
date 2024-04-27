Jay Patel
    SELECT
        cust,
        prod,
        month,
        AVG(quant) AS curr_month_avg
    FROM sales
    GROUP BY cust, prod, month
),
q2 AS (
    SELECT
        m1.cust,
        m1.prod,
        m1.month AS prev_month,
        m2.month AS curr_month,
        AVG(m1.quant) AS prev_month_avg
    FROM sales m1
    LEFT JOIN sales m2 ON m1.month = m2.month - 1
                       AND m1.cust = m2.cust
                       AND m1.prod = m2.prod
    GROUP BY m1.cust, m1.prod, m1.month, m2.month
),
q3 AS (
    SELECT
        m1.cust,
        m1.prod,
        m1.month AS next_month,
        m2.month AS curr_month,
        AVG(m1.quant) AS next_month_avg
    FROM sales m1
    LEFT JOIN sales m2 ON m1.month = m2.month + 1
                       AND m1.cust = m2.cust
                       AND m1.prod = m2.prod
    GROUP BY m1.cust, m1.prod, m1.month, m2.month
),
q4 AS (
    SELECT
        q1.curr_month_avg,
        q2.prev_month_avg,
        q1.month,
        q1.cust,
        q1.prod
    FROM q1
    LEFT JOIN q2 ON q1.month = q2.curr_month
                AND q1.cust = q2.cust
                AND q1.prod = q2.prod
),
q5 AS (
    SELECT
        q4.curr_month_avg,
        q4.prev_month_avg,
        q3.next_month_avg,
        q4.month AS curr_month,
        q4.cust,
        q4.prod
    FROM q4
    LEFT JOIN q3 ON q3.curr_month = q4.month
                AND q3.cust = q4.cust
                AND q3.prod = q4.prod
),
q6 AS (
    SELECT 
        q5.curr_month_avg,
        0 AS prev_month_avg,
        q5.next_month_avg,
        q5.curr_month,
        q5.cust,
        q5.prod
    FROM q5
    WHERE q5.prev_month_avg IS NULL

    UNION ALL

    SELECT 
        q5.curr_month_avg,
        q5.prev_month_avg,
        q5.next_month_avg,
        q5.curr_month,
        q5.cust,
        q5.prod
    FROM q5
    WHERE q5.prev_month_avg IS NOT NULL
),
q7 AS (
    SELECT 
        q6.curr_month_avg,
        q6.prev_month_avg,
        0 AS next_month_avg,
        q6.curr_month,
        q6.cust,
        q6.prod
    FROM q6
    WHERE q6.next_month_avg IS NULL

    UNION ALL

    SELECT 
        q6.curr_month_avg,
        q6.prev_month_avg,
        q6.next_month_avg,
        q6.curr_month,
        q6.cust,
        q6.prod
    FROM q6
    WHERE q6.next_month_avg IS NOT NULL
),
q8 AS (
    SELECT
        q7.cust,
        q7.prod,
        q7.curr_month AS MONTH,
        q7.prev_month_avg AS PREV_MONTH_AVG,
        q7.next_month_avg AS NEXT_MONTH_AVG,
        COUNT(*) AS sales_count_btwn_avgs
    FROM q7
    INNER JOIN sales s ON s.cust = q7.cust
                       AND s.prod = q7.prod
                       AND s.month = q7.curr_month
                       AND (s.quant BETWEEN q7.prev_month_avg AND q7.next_month_avg
                             OR s.quant BETWEEN q7.next_month_avg AND q7.prev_month_avg)
    GROUP BY q7.cust, q7.prod, q7.curr_month, q7.prev_month_avg, q7.next_month_avg
)

SELECT
    q8.cust AS CUSTOMER,
    q8.prod AS PRODUCT,
    q8.month,
    q8.sales_count_btwn_avgs
FROM q8
ORDER BY 3, 2, 1;


    SELECT
        cust,
        prod,
        month,
        AVG(quant) AS curr_month_avg
    FROM sales
    GROUP BY cust, prod, month
),
q2 AS (
    SELECT
        m1.cust,
        m1.prod,
        m1.month AS prev_month,
        m2.month AS curr_month,
        AVG(m1.quant) AS prev_month_avg
    FROM sales m1
    LEFT JOIN sales m2 ON m1.month = m2.month - 1
                       AND m1.cust = m2.cust
                       AND m1.prod = m2.prod
    GROUP BY m1.cust, m1.prod, m1.month, m2.month
),
q3 AS (
    SELECT
        m1.cust,
        m1.prod,
        m1.month AS next_month,
        m2.month AS curr_month,
        AVG(m1.quant) AS next_month_avg
    FROM sales m1
    LEFT JOIN sales m2 ON m1.month = m2.month + 1
                       AND m1.cust = m2.cust
                       AND m1.prod = m2.prod
    GROUP BY m1.cust, m1.prod, m1.month, m2.month
),
q4 AS (
    SELECT
        q1.curr_month_avg,
        q2.prev_month_avg,
        q1.month,
        q1.cust,
        q1.prod
    FROM q1
    LEFT JOIN q2 ON q1.month = q2.curr_month
                AND q1.cust = q2.cust
                AND q1.prod = q2.prod
),
q5 AS (
    SELECT
        q4.curr_month_avg,
        q4.prev_month_avg,
        q3.next_month_avg,
        q4.month AS curr_month,
        q4.cust,
        q4.prod
    FROM q4
    LEFT JOIN q3 ON q3.curr_month = q4.month
                AND q3.cust = q4.cust
                AND q3.prod = q4.prod
),
q6 AS (
    SELECT 
        q5.curr_month_avg,
        0 AS prev_month_avg,
        q5.next_month_avg,
        q5.curr_month,
        q5.cust,
        q5.prod
    FROM q5
    WHERE q5.prev_month_avg IS NULL

    UNION ALL

    SELECT 
        q5.curr_month_avg,
        q5.prev_month_avg,
        q5.next_month_avg,
        q5.curr_month,
        q5.cust,
        q5.prod
    FROM q5
    WHERE q5.prev_month_avg IS NOT NULL
),
q7 AS (
    SELECT 
        q6.curr_month_avg,
        q6.prev_month_avg,
        0 AS next_month_avg,
        q6.curr_month,
        q6.cust,
        q6.prod
    FROM q6
    WHERE q6.next_month_avg IS NULL

    UNION ALL

    SELECT 
        q6.curr_month_avg,
        q6.prev_month_avg,
        q6.next_month_avg,
        q6.curr_month,
        q6.cust,
        q6.prod
    FROM q6
    WHERE q6.next_month_avg IS NOT NULL
),
q8 AS (
    SELECT
        q7.cust,
        q7.prod,
        q7.curr_month AS MONTH,
        q7.prev_month_avg AS PREV_MONTH_AVG,
        q7.next_month_avg AS NEXT_MONTH_AVG
    FROM q7
    INNER JOIN sales s ON s.cust = q7.cust
                       AND s.prod = q7.prod
                       AND s.month = q7.curr_month
    GROUP BY q7.cust, q7.prod, q7.curr_month, q7.prev_month_avg, q7.next_month_avg
)

	SELECT 
		q8.cust as CUSTOMER, 
		q8.prod as PRODUCT, 
		q8.month, 
		q8.prev_month_avg as BEFORE_AVG, 
		avg(quant) as DURING_AVG, 
		q8.next_month_avg as AFTER_AVG
	FROM sales s, q8
	WHERE s.month = q8.month
	AND (s.quant between q8.prev_month_avg and q8.next_month_avg)
	OR (s.quant between q8.next_month_avg and q8.prev_month_avg) 
	GROUP BY 1,2,3,4,6
  	order by 3,2,1




    SELECT cust, MAX(quant) AS first_max
    FROM sales
    WHERE state = 'NJ'
    GROUP BY cust
)
, p2 AS (
    SELECT s.cust, MAX(s.quant) AS second_max
    FROM sales AS s
    JOIN p1 ON p1.cust = s.cust
    WHERE s.quant < p1.first_max AND s.state = 'NJ'
    GROUP BY s.cust
)
, p3 AS (
    SELECT s.cust, MAX(s.quant) AS third_max
    FROM sales AS s
    JOIN p2 ON p2.cust = s.cust
    JOIN p1 ON p1.cust = s.cust
    WHERE s.quant < p1.first_max AND s.quant < p2.second_max AND s.state = 'NJ'
    GROUP BY s.cust
)

SELECT p1.cust as customer, p1.first_max AS QUANTITY, s1.prod as product, s1.date
FROM sales s1
JOIN p1 ON s1.cust = p1.cust AND s1.quant = p1.first_max AND s1.state = 'NJ'
UNION
SELECT p2.cust as customer, p2.second_max AS QUANTITY, s2.prod as product, s2.date
FROM sales s2
JOIN p2 ON s2.cust = p2.cust AND s2.quant = p2.second_max AND s2.state = 'NJ'
UNION
SELECT p3.cust as customer, p3.third_max AS QUANTITY, s3.prod as product, s3.date
FROM sales s3
JOIN p3 ON s3.cust = p3.cust AND s3.quant = p3.third_max AND s3.state = 'NJ'
ORDER BY customer, QUANTITY DESC, date;
