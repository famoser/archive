<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 25/08/2016
 * Time: 18:37
 */

namespace Famoser\OnlineOfficeBundle\Form\Base;


use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

class BaseFormType extends AbstractType
{
    protected function addFields(FormBuilderInterface $formBuilder, array $arguments)
    {
        foreach ($arguments as $key => $val) {
            $arr = array('label' => self::parseToLabel($key));
            if ($key == "description")
                $arr["required"] = false;
            $formBuilder = $formBuilder->add($key, $val, $arr);
        }
        return $formBuilder;
    }

    protected function addSpecialField(FormBuilderInterface $formBuilder, $key, $type, array $arguments)
    {
        if (!isset($arguments['label']))
            $arguments['label'] = self::parseToLabel($key);
        $formBuilder = $formBuilder->add($key, $type, $arguments);
        return $formBuilder;
    }

    private function parseToLabel($key)
    {
        return strtolower(preg_replace(['([A-Z])'], ' $0', $key));
    }

    protected function addSubmitButton(FormBuilderInterface $formBuilder, $short = "save", $label = "save")
    {
        return $formBuilder->add($short, SubmitType::class,
            array(
                'label' => $label,
                'attr' => array('class' => 'btn btn-primary btn-block btn-flat')
            ));
    }

    protected function parseOptionsArray($options)
    {
        $options["submit_text"] = isset($options["submit_text"]) ? $options["submit_text"] : "save";
        $options["submit_short"] = isset($options["submit_short"]) ? $options["submit_short"] : "save";
        return $options;
    }
}