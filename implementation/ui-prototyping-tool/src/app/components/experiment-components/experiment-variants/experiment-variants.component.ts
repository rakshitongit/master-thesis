import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Experiment, Variant } from 'src/app/classes/concrete-classes';
import { ExperimentsService } from 'src/app/services/experiments.service';

@Component({
    selector: 'app-experiment-variants',
    templateUrl: './experiment-variants.component.html',
    styleUrls: ['./experiment-variants.component.scss']
})
export class ExperimentVariantsComponent implements OnInit {

    experimentVariantForm!: FormGroup
    experiment!: Experiment
    updateVariant: boolean = false
    currentVariant!: Variant

    constructor(private fb: FormBuilder, private router: Router, private routerData: ActivatedRoute, private exService: ExperimentsService) { }

    ngOnInit(): void {
        this.experiment = this.routerData.snapshot.data['experiment']
        this.experimentVariantForm = this.fb.group({ variantName: ['', Validators.required], variantPercentage: ['', Validators.required] })
    }

    async submitExperimentVariant() {
        if(this.updateVariant) {
            for(let v of this.experiment.experimentVarients) {
                if(v.id === this.currentVariant.id) {
                    v.name = this.experimentVariantForm.value.variantName
                    v.percentage = this.experimentVariantForm.value.variantPercentage
                }
            }
        } else {
            this.experiment.experimentVarients.push(Variant.createVariant(this.experimentVariantForm.value.variantPercentage, this.experimentVariantForm.value.variantName))
        }
        await lastValueFrom(this.exService.createNewExperimentVariant(this.experiment))
        this.experimentVariantForm.reset()
        this.updateVariant = false
    }

    gotToVariantsDetailsPage(variant: Variant) {
        this.router.navigateByUrl('/experiments/' + this.experiment.id + '/' + variant.id)
    }

    editVariant(variant: Variant) {
        this.updateVariant = true
        this.currentVariant = variant
        this.experimentVariantForm.setValue({ variantPercentage: variant.percentage, variantName: variant.name })
    }

    async deleteExperimentVariant(variant: Variant) {
        this.experiment.experimentVarients = this.experiment.experimentVarients.filter(v => v.id !== variant.id)
        await lastValueFrom(this.exService.createNewExperimentVariant(this.experiment))
    }

}
