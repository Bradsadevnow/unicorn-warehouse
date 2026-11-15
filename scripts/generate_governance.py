"""Build the governance roster from a sibling Skynet checkout."""

import json
import random
import sys
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
PACK = WEB.parent / "skynet" / "villain_pack"
sys.path.insert(0, str(PACK))

from assembler import assemble_villain, load_data
from expander import fallback_surfaces
from villain_profile_renderer import build_headline


ROLES = [
    ("vesper-caldera", "Vesper Caldera", "Chief Executive Officer", "mastermind", 61, "first_dollar_memorial_business_academy", "Portfolio governance", "/terms#interdependence"),
    ("morrow-vale", "Morrow Vale", "Chief Financial Officer", "corporate_predator", 59, "school_of_mark_to_market_prophecy", "Token settlement", "/terms#tokens"),
    ("marigold-thistle", "Marigold Thistle", "Chief Member Officer", "institutional_enforcer", 19, "school_of_therapeutic_power_abuse", "Member consent", "/terms#account-governance"),
    ("lumen-hush", "Dr. Lumen Hush", "Chief Product Officer", "hubristic_creator", 42, "apex_example_of_doing_right_without_force_college", "Dreamwell product standards", "/product-details#dreamwell"),
    ("bramble-quill", "Bramble Quill", "General Counsel", "seductive_deceiver", 88, "institute_of_smelling_a_scam_before_it_happens", "Member understanding", "/terms#severability"),
]

ARTIFACTS_AND_DIALOGUE = [
    ("forbidden_operating_manual", "euphemism"),
    ("coupon_constellation", "literal_optimization"),
    ("sovereign_access_key", "fake_empathy"),
    ("corruptive_wish_object", "literal_optimization"),
    ("cosmic_veto_shard", "euphemism"),
]

CONDUCT_REPLACEMENTS = {
    "marigold-thistle": {"one_bite_reshelver": "dead_required_policy_link"},
    "lumen-hush": {
        "two_minute_voice_note_for_logistics": "reaction_instead_of_answer",
        "lends_out_your_thing_to_a_third_party": "hovering_over_someone_eating",
        "dish_soaker_forever": "non_promotable_task_dodger",
    },
    "bramble-quill": {
        "friday_430_meeting": "puts_you_on_speaker_without_warning",
        "two_minute_voice_note_for_logistics": "screenshotting_private_dms_for_clout",
    },
}


def main():
    data = load_data()
    roster = []
    for role_config, (artifact, dialogue) in zip(ROLES, ARTIFACTS_AND_DIALOGUE, strict=True):
        slug, name, role, family, seed, institution, responsibility, href = role_config
        rng = random.Random(seed)
        card = assemble_villain(
            data, rng, skin_key="corporate_satire", family_key=family, institution_key=institution,
            macguffin_key=artifact, dialogue_key=dialogue,
        )
        replacements = CONDUCT_REPLACEMENTS.get(slug, {})
        card["petty_atrocity_profile"] = [
            {"key": replacements[entry["key"]], **data["petty_atrocities"][replacements[entry["key"]]]}
            if entry["key"] in replacements else entry
            for entry in card["petty_atrocity_profile"]
        ]
        surfaces = fallback_surfaces(rng, card)
        card["title"] = surfaces["title"]
        roster.append({
            "slug": slug,
            "name": name,
            "role": role,
            "responsibility": responsibility,
            "href": href,
            "archetypeTitle": card["title"],
            "headline": build_headline(card),
            "powerSource": card["power_source"],
            "environment": card["operating_environment"],
            "leverage": card["favorite_leverage"],
            "justification": card["justification_logic"],
            "failureMode": card["failure_mode"],
            "institution": card["institution"],
            "exposure": card["institutional_exposure"],
            "competencies": card["core_competencies"]["items"],
            "conduct": [entry["label"] for entry in card["petty_atrocity_profile"]],
            "sidekick": card["sidekick"],
            "artifact": card["macguffin"],
            "quote": surfaces["sample_lines"][0],
            "memo": surfaces["internal_memo"],
        })

    path = WEB / "src" / "content" / "governance.generated.json"
    path.write_text(json.dumps(roster, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {len(roster)} leadership dossiers at {path}")


if __name__ == "__main__":
    main()
