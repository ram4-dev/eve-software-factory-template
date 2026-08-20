import { defineEvalConfig } from "eve/evals";
import { judgeModel } from "../agent/lib/models.js";

/**
 * Run-wide eval configuration.
 *
 * @remarks
 * The judge model scores `t.judge.*` assertions only; it never changes the
 * agent under test. A small, cheap model is enough for the yes/no grading the
 * suite uses. Run the default loop with `pnpm eval --tag fast`; see the
 * README's evals section for the full matrix.
 */
export default defineEvalConfig({
  judge: { model: judgeModel },
});
