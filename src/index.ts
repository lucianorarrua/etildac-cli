#!/usr/bin/env/ node
import inquirer from 'inquirer'
import fs from 'fs'
import { Controller, Component } from './controllers/index'
import { TemplateChoice } from './types'

const choices = fs.readdirSync(`${__dirname}/templates`)
const controllers = {
  component: new Component(),
  admin: new Component(),
  reducer: new Component()
}

const questions = [
  {
    name: 'template-choice',
    type: 'list',
    message: '¿Que plantilla que desea generar?',
    choices: choices
  }
]

inquirer
  .prompt(questions)
  .then((answers) => {
    const templateChoice: TemplateChoice = answers['template-choice'] as TemplateChoice
    const controllerSelected = controllers[templateChoice] as Controller
    controllerSelected.runQuestions()
  })
  .catch((e) => {
    console.log('❌ Ocurrió un error al seleccionar un template', e)
  })
