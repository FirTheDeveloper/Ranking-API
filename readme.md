# Ranking API

**FULL DISCLAIMER: I do not know if this code works. I ripped it right from the Hyperion system and put it together with a bad api router and hoped it works. I have not been able to test it.**

Designed to be simple and easy to use, this system is a two route API allowing for ranking.

## Routes

PATCH /setrank

Headers:
```
{
    "Authorization": "Bearer YOUR_API_KEY"
}
```

Body:
```
{
    "target": The userid of the user you're trying to rank,
    "group": Your group id,
    "rank": The ID to rank the user to (1-255) (Optional),
    "role": The Role NAME of the role to rank to (Customer, etc.) (Optional)
}
```
You may use rank or role interchangably, but at least one has to be present in the request.

---

POST /setrank

Headers:
```
{
    "Authorization": "Bearer YOUR_API_KEY"
}
```

Body:
```
{
    "target": The userid of the user you're trying to rank,
    "group": Your group id,
    "rank": The ID to rank the user to (1-255) (Optional),
    "role": The Role NAME of the role to rank to (Customer, etc.) (Optional)
}
```
You may use rank or role interchangably, but at least one has to be present in the request.
