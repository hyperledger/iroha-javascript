import { IrohaDslConstructorDef, runtimeDefinitions } from '@iroha/data-model';
import { createHelpers, CreateScaleFactory, DEFAULT_CODECS, TypeRegistry } from '@iroha/scale-codec-legacy';

export type AllRuntimeDefinitions = IrohaDslConstructorDef & typeof DEFAULT_CODECS;

export function createDSL(): {
    registry: TypeRegistry;
    createScale: CreateScaleFactory<AllRuntimeDefinitions>;
} {
    const registry = new TypeRegistry();
    registry.register(DEFAULT_CODECS);
    registry.register(runtimeDefinitions);

    const { createScale } = createHelpers<AllRuntimeDefinitions>({ runtime: registry });

    return {
        registry,
        createScale,
    };
}
