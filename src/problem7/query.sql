WITH usd_amount AS (
    SELECT 
        address, 
        SUM(
            CASE 
                WHEN denom = 'usdc' THEN amount * 0.000001
                WHEN denom = 'swth' THEN amount * 0.00000005
                WHEN denom = 'tmz' THEN amount * 0.003
            END
        ) AS total_balance
    FROM balances
    GROUP BY address
)
SELECT DISTINCT usd_amount.address
FROM usd_amount
    JOIN trades ON usd_amount.address = trades.address
WHERE 
    total_balance >= 500 
    AND trades.block_height > 730000