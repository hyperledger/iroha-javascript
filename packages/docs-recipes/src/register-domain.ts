import { Client } from '@iroha2/client';
import {
  RegisterBox,
  EvaluatesToIdentifiableBox,
  Expression,
  Value,
  IdentifiableBox,
  Domain,
  Id,
  BTreeMapAccountIdAccount,
  Metadata,
  BTreeMapNameValue,
  BTreeMapDefinitionIdAssetDefinitionEntry,
  OptionIpfsPath,
  Executable,
  VecInstruction,
  Instruction,
  QueryBox,
} from '@iroha2/data-model';

declare const client: Client;

async function registerDomain(domainName: string) {
  const registerBox = RegisterBox({
    object: EvaluatesToIdentifiableBox({
      expression: Expression(
        'Raw',
        Value(
          'Identifiable',
          IdentifiableBox(
            'Domain',
            Domain({
              id: Id({
                name: domainName,
              }),
              accounts: BTreeMapAccountIdAccount(new Map()),
              metadata: Metadata({ map: BTreeMapNameValue(new Map()) }),
              asset_definitions: BTreeMapDefinitionIdAssetDefinitionEntry(new Map()),
              logo: OptionIpfsPath('None'),
            }),
          ),
        ),
      ),
    }),
  });

  await client.submit(
    Executable('Instructions', VecInstruction([Instruction('Register', registerBox)])),
  );
}

async function ensureDomainExistence(domainName: string) {
  const result = await client.request(QueryBox('FindAllDomains', null));

  result.as('Ok');

  const domain = result
    .as('Ok')
    .as('Vec')
    .map((x) => x.as('Identifiable').as('Domain'))
    .find((x) => x.id.name === domainName);

  if (!domain) throw new Error('Not found');
}

await registerDomain('test');

await ensureDomainExistence('test');
