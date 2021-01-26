/* eslint-disable no-console */

import grpc from 'grpc'

import {
  QueryService_v1Client as QueryService
} from '../lib/proto/endpoint_grpc_pb'

import { queries } from '../lib/index'

const IROHA_ADDRESS = 'localhost:50051'

const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const cert = `-----BEGIN CERTIFICATE-----
MIIFWDCCA0ACCQCKT7AYpIpKFzANBgkqhkiG9w0BAQsFADBuMQswCQYDVQQGEwJy
dTELMAkGA1UECAwCcnUxCzAJBgNVBAcMAnJ1MQswCQYDVQQKDAJydTELMAkGA1UE
CwwCcnUxEjAQBgNVBAMMCWxvY2FsaG9zdDEXMBUGCSqGSIb3DQEJARYIcnVAcnUu
cnUwHhcNMjEwMTEzMTIyODI2WhcNMzEwMTExMTIyODI2WjBuMQswCQYDVQQGEwJy
dTELMAkGA1UECAwCcnUxCzAJBgNVBAcMAnJ1MQswCQYDVQQKDAJydTELMAkGA1UE
CwwCcnUxEjAQBgNVBAMMCWxvY2FsaG9zdDEXMBUGCSqGSIb3DQEJARYIcnVAcnUu
cnUwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCt0VhIbOaCdcGOg9Ed
rQ8xEAuTgVybg+TqmCiCfHBxxtc49pE1eM608ZGT/MH4MlukenHy6Ocoro66me4t
3qOj8fcd5Zkr5qIvS8nxwCH6ronxjHCSXtqggg7knqSNLzfv8UlPQwtl5Ov3luM6
JYaClfWpg3J+yvygK3k1Up4Kkysvemd4HL6rdb4e4G8WDw3Lck9p50+MrPd7/EPL
SYWqwHM15InRp+/JTEzg9y7xmKHpgk9HULaBAA2BLn6GgsBrhwOeZ6Q6MWRByqYW
BwrRfLpa72CmXo20nJl9R3nU7fNgvssEUIe2nKHGZ+XGUmY2RtIeShgWlMGY4ItW
nITGSGzOyBNQ/jZtne5E465poij/Ramgt7co3gyL4801AyYq/10ExmoCF8AED9bh
hAnyTNa0RhMofH88eKuth8rTOOTtsnDGf4V2FXm1lWTaVwCxnMIcRFCYCUGZ184F
+mAtERtzrWP/A+g4YYnn2RWOGrPW/ENGTPGePllGVHvDcU8HwI5VVPBfkD3woMup
uc27LLa/BgAHgt++bsYqKrD29GmNY3bZnexuA3kl9ep1COgtEWXUV73+C8AxpwiF
oOYx+G9OXWPLMirzp34A1Z0sXeL6N15vSEYL72G0YIwyjwvKuIaqU1ubuzVgA2AT
88IsGNFXwi94P2AjdI5EErDLQQIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQBKXVb2
pArfeKdKf81TzoT1+F3IkecizZz+Gl9SpNO/cF83WBON4I1PBElfTqYwSjp8ELSN
r9BmADGAZH86S7P1p6jeaE2irInEphhnmjPBtO+NF7Ht3mlaT1pTvOasv5knAMr2
To6lRsJoxv9oPj68OYoC4qghtk0g6J66JOIjYylNteSlUnRATMc3/x/C8QrUQjRe
DYREVHECoAhlxfG9geLbOE2qyddyPcHszbIDc92Nyo+UsFKvFb0mcqvmB4YjbdVm
pNxyS7iP0SfcF2MNj9JPr64/hMOse9QNpokbJzYQuXXSAGUsCfEPORPGAOZfaZhg
aPI2WHqSOOZB+UD/j5c1hHKkMFYLH28ZI6s6V1sPHdAUd735k6XaguM5MbSgN29f
N2U9Y9xofNgzwfRxPz7y4c12Gi60Mtx0aVOJfqjmOCf3QWi55PrDGs8i0gGIMoI7
OvYyQgbPCXL+fn+PR9/cAME5WHnN6hOzHkzB/Xkxxfsckrtlxhbnd7jyIax3Xry9
i540eey0bq6HIW5x9cYw3eChPbKBTHzz+MvEVnFNfK9/QzN0O3QGU6Hmu+1aozLi
1OBbzZTc7T2yNM0dE8sH6BTfLuCD4oM3DY7F4UkwytrJErEetUSReslq5QOCkHCf
ajZFvbhEe0X67J14YYXiCLasorImHdoenh/kLQ==
-----END CERTIFICATE-----`

const bufferCert = Buffer.from(cert, 'utf-8')

const queryService = new QueryService(
  IROHA_ADDRESS,
  grpc.credentials.createSsl(bufferCert)
)

queries.getAccountTransactions({
  privateKey: adminPriv,
  creatorAccountId: 'admin@test',
  queryService,
  timeoutLimit: 5000
}, {
  accountId: 'admin@test',
  firstTxHash: null,
  pageSize: 100,
  ordering: {
    field: 0,
    direction: 1
  }
})
