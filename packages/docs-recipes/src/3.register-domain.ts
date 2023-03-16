// #region pre
import { Client, ToriiRequirementsForApiHttp, build } from '@iroha2/client'
import { pipe } from 'fp-ts/function'

// --snip--
declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp
// #endregion pre

// #region do-reg
await client.submitExecutable(
  toriiRequirements,
  pipe(
    build.identifiable.newDomain('looking_glass'),
    build.instruction.register,
    build.executable.instruction,
  ),
)
// #endregion do-reg

// #region ensure-fn
async function ensureDomainExistence(domainName: string) {
  // Query all domains
  const result = await client.requestWithQueryBox(
    toriiRequirements,
    build.find.allDomains(),
  )

  // Display the request status
  console.log('%o', result)

  // Obtain the domain
  const domain = result
    .as('Ok')
    .result.enum.as('Vec')
    .map((x) => x.enum.as('Identifiable').enum.as('Domain'))
    .find((x) => x.id.name === domainName) // [!code hl]

  // Throw an error if the domain is unavailable
  if (!domain) throw new Error('Not found')
}
// #endregion ensure-fn

// #region do-ensure
await ensureDomainExistence('looking_glass')
// #endregion do-ensure
