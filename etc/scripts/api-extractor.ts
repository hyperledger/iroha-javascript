import { Extractor, ExtractorConfig, ExtractorResult } from '@microsoft/api-extractor'
import { PUBLIC_PACKAGES, getPackageApiExtractorConfigFile } from '../meta'

export async function runApiExtractor(localBuild = false) {
  for (const pkg of PUBLIC_PACKAGES) {
    const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(getPackageApiExtractorConfigFile(pkg))

    // Invoke API Extractor
    const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
      localBuild,
      showVerboseMessages: true,
    })

    if (!extractorResult.succeeded) {
      throw new Error(
        `API Extractor for package ${pkg} completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`,
      )
    }
  }
}
