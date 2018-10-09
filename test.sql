SELECT upDown,count(upDown) as counts 
FROM votes
WHERE PostId = 1
group by upDown