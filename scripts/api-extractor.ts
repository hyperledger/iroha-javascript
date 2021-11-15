import { Extractor, ExtractorConfig, ExtractorResult } from '@microsoft/api-extractor';
import path from 'path';

const UNSCOPED_PACKAGES_NAMES = [
    'client',
    'data-model',
    'i64-fixnum',
    'crypto-core',
    'crypto-target-node',
    'crypto-target-web',
    'crypto-target-bundler',
];

function resolvePkgExtractorConfig(unscopedName: string): string {
    if (unscopedName.startsWith('crypto-')) {
        const [, tail] = unscopedName.match(/^crypto-(.+)$/)!;
        return path.resolve(__dirname, `../packages/crypto/packages/${tail}/api-extractor.json`);
    }
    return path.resolve(__dirname, `../packages/${unscopedName}/api-extractor.json`);
}

export async function runApiExtractor(localBuild = false) {
    for (const pkg of UNSCOPED_PACKAGES_NAMES) {
        const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(resolvePkgExtractorConfig(pkg));

        // Invoke API Extractor
        const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
            localBuild,
            showVerboseMessages: true,
        });

        if (!extractorResult.succeeded) {
            throw new Error(
                `API Extractor completed with ${extractorResult.errorCount} errors` +
                    ` and ${extractorResult.warningCount} warnings`,
            );
        }
    }
}
