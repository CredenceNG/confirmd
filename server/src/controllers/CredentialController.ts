import { Body, Delete, Get, InternalServerError, JsonController, NotFoundError, Param, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { Credential } from '../content/types'
import { tractionRequest } from '../utils/tractionHelper'
@JsonController('/credentials')
@Service()
export class CredentialController {
  @Get('/connId/:connId')
  public async getCredByConnId(@Param('connId') connId: string) {
    console.log('getCredByConnId', connId)
    const res = (
      await tractionRequest.get('/issue-credential/records', {
        params: {
          connection_id: connId,
        },
      })
    ).data
    console.log('getCredByConnId response', res.data)
    return res
  }

  @Post('/getOrCreateCredDef')
  public async getOrCreateCredDef(@Body() credential: Credential) {
    console.log('getOrCreateCredDef', credential)

    const schemas = (
      await tractionRequest.get(`/schemas/created`, {
        params: { schema_name: credential.name, schema_version: credential.version },
      })
    ).data
    let schema_id = ''
    if (schemas.schema_ids.length <= 0) {
      console.log('Creating schema: schema NOT Found', credential.name, credential.version)
      const schemaAttrs = credential.attributes.map((attr) => attr.name)
      const schemaAttrsJson = JSON.stringify(schemaAttrs)
      console.log('schemaAttrsJson', schemaAttrsJson)

      const schemaAttrsDouble = credential.attributes.map((attr) => `"${attr.name}"`)
      console.log('schemaAttrsDouble', schemaAttrsDouble)

      const dataset = {
        schema_name: credential.name,
        schema_version: credential.version,
        attributes: schemaAttrs, // Use the array directly, don't stringify it
      }
      console.log('dataset', dataset)

      // This will now automatically serialize to the format you want when sent:
      const resp = (await tractionRequest.post(`/schemas`, dataset)).data

      schema_id = resp.sent.schema_id
      await new Promise((r) => setTimeout(r, 5000))
    } else {
      console.log('Schema Found', schemas.schema_ids[0])
      schema_id = schemas.schema_ids[0]
    }

    const credDefs = (await tractionRequest.get(`/credential-definitions/created`, { params: { schema_id } })).data
    let cred_def_id = ''
    if (credDefs.credential_definition_ids.length <= 0) {
      const resp = (
        await tractionRequest.post(`/credential-definitions`, {
          revocation_registry_size: 25,
          schema_id,
          support_revocation: true,
          tag: credential.name,
        })
      ).data
      cred_def_id = resp.sent.credential_definition_id
    } else {
      cred_def_id = credDefs.credential_definition_ids[0]
    }
    return cred_def_id
  }

  @Post('/offerCredential')
  public async offerCredential(@Body() params: any) {
    console.log('offerCredential', params)
    const response = await tractionRequest.post(`/issue-credential/send`, params)
    console.log('offerCredential response', response.data)
    return response.data
  }
}
