import {TaskContext} from "vitest";
import * as allure from "allure-vitest";

export async function annotateAllure(
    ctx: TaskContext,
    attrs: { id: number, feature: string, sdkTestId: string, story: string }
) {
    await allure.label(ctx, 'allure_id', String(attrs.id))
    await allure.label(ctx, 'feature', attrs.feature)
    await allure.label(ctx, 'sdk_test_id', attrs.sdkTestId)
    await allure.label(ctx, 'story', attrs.story)
    await allure.owner(ctx, 'dulger')
    await allure.label(ctx, 'permission', 'no_permission_required')
    await allure.label(ctx, 'sdk', 'JavaScript')
}